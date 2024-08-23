import { REASONS } from "@/constants/reasons";
import { zodResolver } from "@hookform/resolvers/zod";

import { SelectContent } from "@radix-ui/react-select";
import { useForm } from "react-hook-form";

import { useSendEmail } from "@/services/mailgun";
import { ReportStoryRequestSchema, type ReportStoryRequestPayload } from "@/services/types";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  open: boolean;
  setOpen: (open: boolean, type: "signIn" | "report") => void;
};
export default function ReportStory({ open, setOpen }: Props) {
  const { mutateAsync: sendEmailAsync } = useSendEmail();

  const form = useForm<ReportStoryRequestPayload>({
    resolver: zodResolver(ReportStoryRequestSchema),
    defaultValues: {
      reason: "Spam",
      email: "",
      addInfo: "",
    },
  });

  const setOpenModal = (open: boolean) => {
    return setOpen(open, "report");
  };
  const onSubmit = (values: ReportStoryRequestPayload) => {
    sendEmailAsync(values);
  };

  return (
    <div className="flex h-full w-full items-center justify-center">
      <Dialog open={open} onOpenChange={setOpenModal}>
        <DialogContent className="w-full rounded-lg bg-white p-6 shadow-xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Report Story</DialogTitle>
            <DialogClose asChild>
              <Button
                asChild
                className="absolute right-2 top-2 p-2 text-gray-400 transition duration-200 hover:text-gray-600"
                aria-label="Close"
              ></Button>
            </DialogClose>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="mt-4 space-y-4">
              <FormField
                control={form.control}
                name="reason"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      Reason
                    </FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent className="z-100 h-[200px] overflow-scroll rounded-xl bg-white shadow-md">
                        {REASONS.map((reason) => (
                          <SelectItem key={reason} value={reason}>
                            {reason}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="addInfo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="block text-sm font-medium text-gray-700">
                      Additional Comments
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                        rows={4}
                        placeholder="Provide more details..."
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end">
                <Button
                  type="submit"
                  className="rounded-xl bg-purple-500 px-4 py-2 font-semibold text-white transition duration-200 hover:bg-purple-600"
                >
                  Submit Report
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
