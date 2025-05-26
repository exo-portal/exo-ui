import { useTranslations } from "next-intl";
import React from "react";
import {
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormControl,
} from "./ui/form";
import { Input } from "./ui/input";
import { translate } from "@/lib";
import { TxKeyPath } from "@/i18n";
import { z } from "zod";
import {
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { DatePicker } from "./ui/datepicker";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface OptionsInterface {
  label: string;
  value: string;
}

type FormFieldInputProps = {
  id: string;
  name: keyof z.infer<FormFieldInputProps["schema"]>;
  type?: React.HTMLInputTypeAttribute;
  control: any;
  schema: z.ZodTypeAny;
  labelKey: TxKeyPath;
  placeholderKey: TxKeyPath;
  inputSuffixIcon?: React.ReactNode;
  componentType?:
    | "input"
    | "select"
    | "textarea"
    | "checkbox"
    | "radio"
    | "datePicker";
  options?: OptionsInterface[];
};

export default function FormFieldInput({
  id,
  type = "text",
  name,
  control,
  labelKey,
  placeholderKey,
  inputSuffixIcon,
  componentType = "input",
  options = [],
}: FormFieldInputProps) {
  const t = useTranslations();

  const componentRender = (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState
  ) => {
    switch (componentType) {
      case "input":
        return (
          <Input
            id={id}
            maxLength={50}
            type={type}
            aria-invalid={fieldState.invalid}
            inputSuffixIcon={inputSuffixIcon}
            {...field}
            placeholder={translate(t, placeholderKey)}
          />
        );
      // TODO:: enhance design system for select input
      case "select":
        return (
          <Select aria-invalid={fieldState.invalid}>
            <SelectTrigger>
              <SelectValue placeholder={translate(t, placeholderKey)} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>{translate(t, labelKey)}</SelectLabel>
                {options.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    className="cursor-pointer"
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        );
      // TODO:: enhance design system for Date picker input
      case "datePicker":
        return <DatePicker aria-label={String(fieldState.invalid)} />;
      default:
        return (
          <Input
            id={id}
            maxLength={50}
            type={type}
            aria-invalid={fieldState.invalid}
            inputSuffixIcon={inputSuffixIcon}
            {...field}
            placeholder={translate(t, placeholderKey)}
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field, fieldState }) => (
        <FormItem className="w-full">
          <FormLabel className="text-neutral-600 font-medium" htmlFor={id}>
            {translate(t, labelKey)}
          </FormLabel>
          <FormControl>{componentRender(field, fieldState)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
