import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

export const forgotPasswordForm = useForm<
  z.infer<typeof ForgotPasswordFormSchema>
>({
  resolver: zodResolver(ForgotPasswordFormSchema),
  defaultValues: {
    identifier: "",
  },
  mode: "onTouched",
  reValidateMode: "onChange",
});
