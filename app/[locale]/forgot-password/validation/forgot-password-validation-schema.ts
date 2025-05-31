import { z } from "zod";

export const ForgotPasswordFormSchema = z.object({
  identifier: z
    .string()
    .min(1, "Email or phone number is required")
    .refine(
      (val) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) || // email validation
        /^(\+?\d{1,4})?[-.\s]?(\d{10,15})$/.test(val), // phone number validation (country code optional, simplified spacing)
      {
        message: "Enter a valid email or phone number.",
      }
    ),
});