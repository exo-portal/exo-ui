"use client";

import FormFieldInput from "@/components/form-field-input/form-field-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PATH } from "@/config";
import { getCurrentLocale, translate } from "@/lib";
import { useAppStateStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function ForgotPasswordForm() {
  const { setIsLoading } = useAppStateStore();
  const t = useTranslations();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const FormSchema = z.object({
    identifier: z
      .string()
      .min(1, "Email or password is required")
      .refine(
        (val) =>
          /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val) ||
          /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(val),
        {
          message:
            "Must be a valid email or a password (min 8 chars, at least one letter and one number)",
        }
      ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      identifier: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const { identifier } = values;
    setIsLoading(true);

    // TODO:: Implement the forgot password logic here
    console.log("Forgot Password Identifier:", identifier);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormFieldInput
          id="identifier"
          name={"identifier"}
          control={form.control}
          schema={FormSchema}
          labelKey={"forgotPassword.form.enterEmail.identifier.label"}
          placeholderKey={
            "forgotPassword.form.enterEmail.identifier.placeholder"
          }
        />
        <Button type="submit">
          {translate(t, "forgotPassword.button.submit")}
        </Button>
      </form>

      {/* Sign In Link */}
      <div className="text-center mt-2 text-neutral-500 text-label">
        {translate(t, "forgotPassword.form.alreadyHaveAccount.text")}
        <Link
          onClick={() => setIsLoading(true)}
          className="text-main-700 underline px-1"
          href={PATH.LOGIN.getPath(getCurrentLocale())}
        >
          {translate(t, "forgotPassword.form.alreadyHaveAccount.signIn")}
        </Link>
      </div>
    </Form>
  );
}
