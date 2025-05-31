import { z } from "zod";

export const OtpFormSchema = z.object({
  pin: z.string().length(4, {
    message: "Your one-time password must be 4 characters.",
  }),
});
