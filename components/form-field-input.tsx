import { useTranslations } from "next-intl";
import React from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { translate } from "@/lib";
import { TxKeyPath } from "@/i18n";
import { z } from "zod";

type FormFieldInputProps = {
  control: any;
  schema: z.ZodTypeAny;
  name: keyof z.infer<FormFieldInputProps["schema"]>;
  id: string;
  placeholderKey: TxKeyPath;
  labelKey: TxKeyPath;
  type?: React.HTMLInputTypeAttribute;
  inputSuffixIcon?: React.ReactNode;
};

export default function FormFieldInput({
  control,
  name,
  placeholderKey,
  id,
  labelKey,
  type = "text",
  inputSuffixIcon
}: FormFieldInputProps) {
  const t = useTranslations();

  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field, fieldState }) => (
        <FormItem className="w-full">
          <FormLabel className="text-neutral-600 font-medium" htmlFor={id}>
            {translate(t, labelKey)}
          </FormLabel>
          <FormControl>
            <Input
              id={id}
              maxLength={50}
              type={type}
              aria-invalid={fieldState.invalid}
              inputSuffixIcon={inputSuffixIcon}
              {...field}
              placeholder={translate(t, placeholderKey)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
