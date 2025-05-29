"use client";

import { z } from "zod";
import React, { useEffect } from "react";
import { PATH } from "@/config";
import { getCurrentLocale, translate } from "@/lib";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { GENDER_TYPE, useAppStateStore, useRegistrationStore } from "@/store";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import FormFieldInput from "@/components/form-field-input/form-field-input";

export function PersonalDetailsForm() {
  const t = useTranslations();
  const router = useRouter();
  const { setIsLoading } = useAppStateStore();
  const { data, setData } = useRegistrationStore();

  // Simulate loading state
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  const GENDER_OPTIONS = [
    { value: "male", label: "male" },
    { value: "female", label: "female" },
    { value: "other", label: "other" },
  ];

  const FormSchema = z.object({
    firstName: z.string().min(1, "Firstname is required"),
    lastName: z.string().min(1, "Lastname is required"),
    dateOfBirth: z
      .string()
      .min(1, "Date of birth is required")
      .refine((val) => !isNaN(Date.parse(val)), {
        message: "Date of birth must be a valid date",
      }),
    gender: z.enum(
      [...GENDER_OPTIONS.map((option) => option.value)] as [
        string,
        ...string[]
      ],
      {
        errorMap: (issue) => {
          if (issue.code === "invalid_enum_value") {
            return { message: "Gender is required" };
          }
          return { message: "Gender must be one of: male, female, other" };
        },
      }
    ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      dateOfBirth: data.dateOfBirth || "",
      gender: data.gender || "male",
    },
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const onSubmit = ({
    firstName,
    lastName,
    gender,
    dateOfBirth,
  }: z.infer<typeof FormSchema>) => {
    const trimData = {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      dateOfBirth: dateOfBirth.trim(),
      gender: gender as GENDER_TYPE,
    };
    setData({
      ...data,
      ...trimData,
    });
    setIsLoading(true);

    router.push(PATH.REGISTER_CONTACT_DETAILS.getPath(getCurrentLocale()));
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-[500px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-4 items-start">
          {/* First Name */}
          <FormFieldInput
            id={"firstName"}
            name={"firstName"}
            schema={FormSchema}
            control={form.control}
            labelKey={"register.form.personalDetails.input.label.firstName"}
            placeholderKey={
              "register.form.personalDetails.input.placeholder.firstName"
            }
          />
          {/* Last Name */}
          <FormFieldInput
            id={"lastName"}
            name={"lastName"}
            schema={FormSchema}
            control={form.control}
            labelKey={"register.form.personalDetails.input.label.lastName"}
            placeholderKey={
              "register.form.personalDetails.input.placeholder.lastName"
            }
          />
        </div>
        {/* Date Of Birth */}
        <FormFieldInput
          id={"dateOfBirth"}
          name={"dateOfBirth"}
          control={form.control}
          schema={FormSchema}
          componentType="datePicker"
          labelKey={"register.form.personalDetails.input.label.dateOfBirth"}
          placeholderKey={
            "register.form.personalDetails.input.placeholder.dateOfBirth"
          }
        />
        {/* Date Of Birth */}
        <FormFieldInput
          id={"gender"}
          name={"gender"}
          control={form.control}
          schema={FormSchema}
          componentType="select"
          labelKey={"register.form.personalDetails.input.label.gender"}
          placeholderKey={
            "register.form.personalDetails.input.placeholder.gender"
          }
          options={GENDER_OPTIONS}
        />
        <Button type="submit" variant={"default"} className="mt-4">
          {translate(t, "register.form.personalDetails.button.next")}
        </Button>
      </form>
    </Form>
  );
}
