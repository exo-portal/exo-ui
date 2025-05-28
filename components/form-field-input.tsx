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
import { cn, translate } from "@/lib";
import { TxKeyPath } from "@/i18n";
import { z } from "zod";
import {
  Control,
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
import Image, { StaticImageData } from "next/image";
import { PHFlag } from "./national-flag";

export interface OptionsInterface {
  label: string;
  value: string;
  icon?: StaticImageData;
}

type FormFieldInputProps = {
  id: string;
  name: keyof z.infer<FormFieldInputProps["schema"]>;
  type?: React.HTMLInputTypeAttribute;
  control: Control<z.infer<FormFieldInputProps["schema"]>>;
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
    | "datePicker"
    | "inputGroup";
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
      case "inputGroup":
        console.log(name, "name");
        console.log("options", options);
        return (
          <div
            className={cn(
              "flex group has-[input:focus-within]:bg-main-50 has-[input:focus-visible]:border-main-400 has-[input:focus-visible]:ring-4 has-[input:focus-visible]:ring-main-100",
              "bg-neutral-50 border border-neutral-200 rounded-lg w-full"
            )}
          >
            <Select
              value={value}
              onValueChange={onChange}
              aria-label={String(fieldState.invalid)}
            >
              <SelectTrigger
                isInputGroup
                className="w-[120px]"
                value={value}
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder={"+63"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option) => (
                    <SelectItem
                      key={option.value}
                      value={option.value}
                      className="cursor-pointer"
                    >
                      {option.icon && (
                        <Image src={option.icon} alt={option.label} />
                      )}

                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <Input isInputGroup />
          </div>
        );
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
