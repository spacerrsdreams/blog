import FormData from "form-data";
import Mailgun from "mailgun.js";

import { auth } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

import { ERROR_CODES, ERROR_MESSAGES, handleError } from "@/lib/error";
import { ReportStoryRequestSchema } from "@/services/types";

const DOMAIN = process.env.MAILGUN_DOMAIN || "";
const API_KEY = process.env.MAILGUN_API_KEY || "";
const ADDRESS_EMAIL = process.env.MAILGUN_ADDRESS_EMAIL || "";

const mailgun = new Mailgun(FormData).client({
  username: "api",
  key: API_KEY,
});

export const POST = async (req: NextRequest) => {
  try {
    const user = auth();
    if (!user.userId) {
      return handleError(ERROR_MESSAGES[ERROR_CODES.USER_IS_NOT_AUTHENTICATED]);
    }

    const body = await req.json();
    const data = ReportStoryRequestSchema.parse(body);

    const messageData = {
      from: data.email,
      to: ADDRESS_EMAIL,
      subject: "Report" + " - " + `${data.reason}`,
      html: "<p>" + data.addInfo + "</p>",
    };

    const res = await mailgun.messages.create(DOMAIN, messageData);

    if (res) {
      return NextResponse.json({ message: "Report email sent successfully." }, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "An error occurred while sending the report email." },
        { status: 500 },
      );
    }
  } catch (err) {
    console.error(err);
    return handleError(err);
  }
};
