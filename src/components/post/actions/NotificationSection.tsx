"use client";

import { type NotificationPayload } from "@/types";

import { useUser } from "@clerk/nextjs";
import { useEffect, useRef, useState } from "react";

import { NotificationText } from "@/utils/NotificationText";
import { useGetNotifications } from "@/services/notification";
import { Icons } from "@/components/shared/Icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Skeleton } from "@/components/ui/skeleton";

export default function NotificationSection() {
  const POST_LOADING_LIMIT = 1;
  const loader = useRef(null);
  const [position, setPosition] = useState("bottom");
  const [notifications, setNotifications] = useState<NotificationPayload[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const { mutateAsync: getNotifications, isPending, error } = useGetNotifications();
  const [initialCallIsLoading, setInitialCallIsLoading] = useState(true);
  const [dynamicScroll, setDynamicScroll] = useState({ from: 0, to: POST_LOADING_LIMIT });
  const [clicked, setClicked] = useState(false); // Track if the button was clicked

  useEffect(() => {
    if (clicked) {
      setNotifications([]);
      setHasMore(true);

      getNotifications({ from: 0, to: POST_LOADING_LIMIT }).then((newNotifications) => {
        setNotifications(newNotifications);
        setHasMore(newNotifications.length > 0);
        setInitialCallIsLoading(false);
      });
    }
  }, [clicked]);

  useEffect(() => {
    if (hasMore && !isPending && !initialCallIsLoading) {
      getNotifications({ ...dynamicScroll }).then((newNotifications) => {
        setNotifications((prevNotifications) => [...prevNotifications, ...newNotifications]);
        setHasMore(newNotifications.length > 0);
      });
    }
  }, [dynamicScroll]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isPending && hasMore) {
          setDynamicScroll((prev) => ({
            from: prev.to,
            to: prev.to + POST_LOADING_LIMIT,
          }));
        }
      },
      { threshold: 1.0 },
    );

    if (loader.current) {
      observer.observe(loader.current);
    }

    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [loader, isPending, hasMore]);

  const { isSignedIn } = useUser();

  return (
    <div className="flex flex-col gap-6">
      <DropdownMenu
        onOpenChange={() => {
          setClicked(true);
        }}
      >
        <DropdownMenuTrigger asChild>
          {isSignedIn && (
            <span onClick={() => setClicked(true)}>
              <Icons.notification />
            </span>
          )}
        </DropdownMenuTrigger>
        <DropdownMenuContent className="h-[600px] w-96 overflow-y-scroll pl-2">
          <DropdownMenuLabel className="text-2xl font-bold">Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
            <div>
              {notifications?.map((notification) => {
                return (
                  <DropdownMenuRadioItem
                    className="cursor-pointer pl-0"
                    key={notification?.id}
                    value="top"
                  >
                    <NotificationText
                      userImage={notification?.user.imageUrl}
                      userName={notification?.user.username}
                      actionType={notification?.type}
                      createdAt={notification?.createdAt}
                    />
                  </DropdownMenuRadioItem>
                );
              })}
              {!isPending && notifications?.length === 0 && <span>not found</span>}

              {!error && notifications?.length > 0 && <div ref={loader} />}

              {isPending && (
                <div className="flex flex-col gap-12">
                  {Array.from({ length: POST_LOADING_LIMIT }).map((_, idx) => (
                    <div key={idx} className="flex items-center space-x-4">
                      <Skeleton className="h-12 w-12 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-[250px]" />
                        <Skeleton className="h-4 w-[200px]" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
