import { DEFAULT_OTP_LENGTH } from "@/config";
import { z } from "zod";

export const OtpFormSchema = z.object({
  pin: z.string().length(DEFAULT_OTP_LENGTH, {
    message: "Your one-time password must be 4 characters.",
  }),
});
