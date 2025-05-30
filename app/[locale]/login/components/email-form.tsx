"use client";
import FormFieldInput from "@/components/form-field-input/form-field-input";
import { UserIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { PATH } from "@/config";
import { getCurrentLocale, translate } from "@/lib";
import { useAppStateStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function EmailForm() {
  const t = useTranslations();
  const { setIsLoading } = useAppStateStore();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const FormSchema = z.object({
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
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof FormSchema>) => {
    const { email, password } = values;
    console.log(email, password);
    setIsLoading(true);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormFieldInput
          id="email"
          name={"email"}
          schema={FormSchema}
          control={form.control}
          labelKey={"register.form.signUp.input.label.email"}
          placeholderKey={"register.form.signUp.input.placeholder.email"}
          inputSuffixIcon={<Image src={UserIcon} alt="User Icon" />}
        />
        <div className="flex flex-col items-end gap-2">
          <FormFieldInput
            id={"password"}
            name={"password"}
            type={"password"}
            schema={FormSchema}
            control={form.control}
            labelKey={"register.form.signUp.input.label.password"}
            placeholderKey={"register.form.signUp.input.placeholder.password"}
          />
          <button className="justify-self-end text-label text-main-700 cursor-pointer hover:underline">
            {translate(t, "login.form.signIn.button.forgotPassword")}
          </button>
        </div>
        <Button type="submit">
          {translate(t, "login.form.signIn.button.signIn")}
        </Button>

        {/* Sign In Link */}
        <div className="text-center mt-2 text-neutral-500 text-label">
          {translate(t, "login.form.signIn.alreadyHaveAccount.text")}
          <Link
            className="text-main-700 underline px-1"
            onClick={() => setIsLoading(true)}
            href={PATH.REGISTER.getPath(getCurrentLocale())}
          >
            {translate(t, "login.form.signIn.alreadyHaveAccount.signUp")}
          </Link>
        </div>
      </form>
    </Form>
  );
}
