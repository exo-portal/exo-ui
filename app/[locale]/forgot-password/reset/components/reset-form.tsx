"use client";
import { useAppStateStore } from "@/store";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { z } from "zod";
import { ResetFormSchema } from "../validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/form-field-input/form-field-input";
import { Button } from "@/components/ui/button";
import { translate } from "@/lib";

export function ResetForm() {
  const t = useTranslations();
  const { setIsLoading } = useAppStateStore();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const form = useForm<z.infer<typeof ResetFormSchema>>({
    resolver: zodResolver(ResetFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = (values: z.infer<typeof ResetFormSchema>) => {
    // TODO:: Handle form submission logic here
    console.log("Form submitted with values:", values);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* NEW PASSWORD FIELD */}
        <FormFieldInput
          id={"password"}
          name={"password"}
          type={"password"}
          schema={ResetFormSchema}
          control={form.control}
          labelKey={"forgotPassword.form.reset.input.label.newPassword"}
          placeholderKey={
            "forgotPassword.form.reset.input.placeholder.newPassword"
          }
        />

        {/* RE ENTER NEW PASSWORD FIELD */}
        <FormFieldInput
          type="password"
          schema={ResetFormSchema}
          id={"confirmPassword"}
          control={form.control}
          name={"confirmPassword"}
          labelKey={"forgotPassword.form.reset.input.label.reEnterNewPassword"}
          placeholderKey={
            "forgotPassword.form.reset.input.placeholder.reEnterNewPassword"
          }
        />
        <Button type="submit">
          {translate(t, "forgotPassword.form.reset.button.savePassword")}
        </Button>
      </form>
    </Form>
  );
}
