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
  autoComplete?: "off" | "on";
};

export default function FormFieldInput({
  id,
  type = "text",
  name,
  control,
  options = [],
  labelKey,
  autoComplete = "off",
  componentType = "input",
  placeholderKey,
  inputSuffixIcon,
}: FormFieldInputProps) {
  const t = useTranslations();

  const componentRender = (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState
  ) => {
    const { value, onChange } = field;
    switch (componentType) {
      case "input":
        return (
          <Input
            id={id}
            maxLength={50}
            type={type}
            autoComplete={autoComplete}
            aria-invalid={fieldState.invalid}
            inputSuffixIcon={inputSuffixIcon}
            {...field}
            placeholder={translate(t, placeholderKey)}
          />
        );
      case "select":
        const handleOnclear = () => {
          onChange(""); // Clear the selections
        };
        return (
          <Select
            value={value}
            onValueChange={onChange}
            aria-label={String(fieldState.invalid)}
          >
            <SelectTrigger
              onClear={handleOnclear}
              value={value}
              aria-invalid={fieldState.invalid}
            >
              <SelectValue placeholder={translate(t, placeholderKey)} />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
      case "datePicker":
        return (
          <DatePicker
            placeholder={translate(t, placeholderKey)}
            aria-label={String(fieldState.invalid)}
            onChange={(date) => {
              field.onChange(date);
            }}
            value={field.value}
          />
        );
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
