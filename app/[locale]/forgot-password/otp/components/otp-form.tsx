"use client";

import { useAppStateStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { OtpFormSchema } from "../validation";
import { z } from "zod";
import { Form } from "@/components/ui/form";
import FormFieldInput from "@/components/form-field-input/form-field-input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { PATH } from "@/config";
import { getCurrentLocale, translate } from "@/lib";
import { useTranslations } from "next-intl";

export function OtpForm() {
  const { setIsLoading } = useAppStateStore();
  const router = useRouter();
  const t = useTranslations();

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const form = useForm<z.infer<typeof OtpFormSchema>>({
    resolver: zodResolver(OtpFormSchema),
    defaultValues: {
      pin: "",
    },
  });

  const onSubmit = (data: z.infer<typeof OtpFormSchema>) => {
    setIsLoading(true);
    console.log("OTP submitted:", data.pin);
    router.push(PATH.FORGOT_PASSWORD_RESET.getPath(getCurrentLocale()));
  };

  // Watch the pin value to determine button disabled state
  const pinValue = form.watch("pin");

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-16"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormFieldInput
          control={form.control}
          id={"pin"}
          name={"pin"}
          schema={OtpFormSchema}
          componentType="otp-input"
          maxLength={4}
          autoFocus // Add this prop to focus on load
        />
        <div className="space-y-4 w-full">
          <Button
            className="w-full"
            type="submit"
            disabled={pinValue.length !== 4}
          >
            {translate(t, "forgotPassword.form.otp.button.verify")}
          </Button>
          {/* Resent Button */}
          <div className="text-center text-neutral-500 text-label">
            {translate(
              t,
              "forgotPassword.form.otp.button.didNotReceiveCode.text"
            )}
            <Button
              onClick={() => setIsLoading(true)}
              className="text-main-700 underline px-1"
              variant={"link"}
            >
              {translate(
                t,
                "forgotPassword.form.otp.button.didNotReceiveCode.resend"
              )}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
