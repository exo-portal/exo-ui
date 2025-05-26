"use client";

import React from "react";
import Image from "next/image";
import FormFieldInput from "@/components/form-field-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { translate } from "@/lib";
import { useTranslations } from "next-intl";
import { UserIcon } from "@/components/icons";
import Link from "next/link";

export default function EmailForm() {
  const t = useTranslations();

  const FormSchema = z
    .object({
      email: z
        .string()
        .min(1, "Email is required")
        .email("Invalid email address")
        .min(8, "Email must be at least 8 characters"),
      password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(
          /[^A-Za-z0-9]/,
          "Password must contain at least one special character"
        ),
      confirmPassword: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    // TODO:: Handle form submission logic here
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* EMAIL FIELD */}
        <FormFieldInput
          id={"email"}
          name={"email"}
          schema={FormSchema}
          control={form.control}
          inputSuffixIcon={<Image src={UserIcon} alt="user icon" />}
          labelKey={"register.form.input.label.email"}
          placeholderKey={"register.form.input.placeholder.email"}
        />

        {/* PASSWORD FIELD */}
        <FormFieldInput
          id={"password"}
          name={"password"}
          type={"password"}
          schema={FormSchema}
          control={form.control}
          labelKey={"register.form.input.label.password"}
          placeholderKey={"register.form.input.placeholder.password"}
        />

        {/* RE ENTER PASSWORD FIELD */}
        <FormFieldInput
          control={form.control}
          schema={FormSchema}
          name={"confirmPassword"}
          id={"confirmPassword"}
          placeholderKey={"register.form.input.placeholder.reEnterPassword"}
          labelKey={"register.form.input.label.reEnterPassword"}
          type="password"
        />

        {/* Submit */}
        <Button type="submit">
          {translate(t, "register.form.button.continue")}
        </Button>
      </form>

      {/* Sign In Link */}
      <div className="text-center text-neutral-500 text-label">
        {translate(t, "register.form.alreadyHaveAccount.text")}
        <Link className="text-main-700 underline px-1" href={"#"}>
          {translate(t, "register.form.alreadyHaveAccount.signIn")}
        </Link>
      </div>
    </Form>
  );
}
