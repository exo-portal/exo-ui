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
import { getCurrentLocale } from "@/lib";

export function OtpForm() {
  const { setIsLoading } = useAppStateStore();
  const router = useRouter();

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
    console.log(data);
    setIsLoading(true);
    router.push(PATH.FORGOT_PASSWORD_RESET.getPath(getCurrentLocale()));
  };

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
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
