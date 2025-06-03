"use client";

import { z } from "zod";
import Link from "next/link";
import Image from "next/image";
import { ExoPortalErrorMessage, PATH } from "@/config";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { Form } from "@/components/ui/form";
import { useRouter } from "next/navigation";
import { UserIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { getCurrentLocale, handleErrorMessage, translate } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAppStateStore, useRegistrationStore } from "@/store";
import FormFieldInput from "@/components/form-field-input/form-field-input";
import { RegisterOperations } from "../functions/register-functions";

export default function EmailForm() {
  const t = useTranslations();
  const router = useRouter();
  const { data, setData } = useRegistrationStore();
  const { setIsLoading } = useAppStateStore();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

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
      email: data.email || "",
      password: data.password || "",
      confirmPassword: data.confirmPassword || "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    setIsLoading(true);
    const { email, password, confirmPassword } = values;
    // Call the API to validate email existence before proceeding
    RegisterOperations.validateEmail(email)
      .then((response: { status: number }) => {
        if (response.status === 200) {
          setData({
            email: email.trim(),
            password: password.trim(),
            confirmPassword: confirmPassword.trim(),
          });
          router.push(
            PATH.REGISTER_PERSONAL_DETAILS.getPath(getCurrentLocale())
          );
        }
      })
      .catch((e) => {
        const data: ExoPortalErrorMessage = e.response?.data;
        handleErrorMessage({
          data: data,
          form: form,
          allowedFields: ["email"],
          useTranslate: t,
        });
      });
    return;
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormFieldInput
          id={"email"}
          name={"email"}
          schema={FormSchema}
          control={form.control}
          labelKey={"register.form.signUp.input.label.email"}
          placeholderKey={"register.form.signUp.input.placeholder.email"}
          inputSuffixIcon={<Image src={UserIcon} alt="User Icon" />}
          autoFocus
          autoComplete="email"
        />
        <FormFieldInput
          id={"password"}
          name={"password"}
          type={"password"}
          schema={FormSchema}
          control={form.control}
          labelKey={"register.form.signUp.input.label.password"}
          placeholderKey={"register.form.signUp.input.placeholder.password"}
          autoComplete="current-password"
        />

        {/* RE ENTER PASSWORD FIELD */}
        <FormFieldInput
          type="password"
          schema={FormSchema}
          id={"confirmPassword"}
          control={form.control}
          name={"confirmPassword"}
          labelKey={"register.form.signUp.input.label.reEnterPassword"}
          placeholderKey={
            "register.form.signUp.input.placeholder.reEnterPassword"
          }
        />
        <Button type="submit">
          {translate(t, "register.form.signUp.button.continue")}
        </Button>
      </form>

      {/* Sign In Link */}
      <div className="text-center mt-2 text-neutral-500 text-label">
        {translate(t, "register.form.signUp.alreadyHaveAccount.text")}
        <Link
          onClick={() => setIsLoading(true)}
          className="text-main-700 underline px-1"
          href={PATH.LOGIN.getPath(getCurrentLocale())}
        >
          {translate(t, "register.form.signUp.alreadyHaveAccount.signIn")}
        </Link>
      </div>
    </Form>
  );
}
