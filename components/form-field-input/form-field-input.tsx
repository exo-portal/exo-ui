import { useTranslations } from "next-intl";
import React, { useState } from "react";
import { cn, formatPhoneNumber, liveFormat, translate } from "@/lib";
import { TxKeyPath } from "@/i18n";
import { z } from "zod";
import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

import Image, { StaticImageData } from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { DatePicker } from "../ui/datepicker";
import { TypeTelInput } from "./form-field-input-function";
import { Type } from "lucide-react";

export interface OptionsInterface {
  label: string;
  value: string;
  icon?: StaticImageData;
  countryCode?: string;
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
    | "tel";
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
    const [country, setCountry] = useState<string>("PH");
    const COUNTRY_CODE =
      options.find((opt) => opt.value === country)?.countryCode || "+64";

    switch (componentType) {
      case "tel":
        return (
          <div
            className={cn(
              "flex group has-[input:focus-within]:bg-main-50 has-[input:focus-visible]:border-main-400 has-[input:focus-visible]:ring-4 has-[input:focus-visible]:ring-main-100",
              "bg-neutral-50 border border-neutral-200 rounded-lg w-full"
            )}
          >
            <Select
              value={country}
              onValueChange={(value: string) => {
                setCountry(value);
                onChange("");
              }}
              aria-label={String(fieldState.invalid)}
            >
              <SelectTrigger
                isInputGroup
                className="w-[120px]"
                value={country}
                aria-invalid={fieldState.invalid}
              >
                <SelectValue placeholder={"+63"} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {options.map((option: OptionsInterface) => (
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
            <Input
              {...(field as ControllerRenderProps<FieldValues, string>)}
              // TODO:: Enhance the placeholder based on country
              placeholder={formatPhoneNumber({
                value: country === "PH" ? "917 123 4567" : "202 555 0125",
                country: country,
              })}
              type="tel"
              autoComplete={autoComplete}
              aria-invalid={fieldState.invalid}
              inputSuffixIcon={inputSuffixIcon}
              id={id}
              isInputGroup
              value={value as string}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                TypeTelInput.onChangeTel(e, country, COUNTRY_CODE, onChange)
              }
              onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                TypeTelInput.onBlurTel(e, onChange, country)
              }
              onKeyDown={TypeTelInput.onKeyDownTel}
              onFocus={(e: React.FocusEvent<HTMLInputElement>) =>
                TypeTelInput.onFocusTel(e, onChange, country, COUNTRY_CODE)
              }
            />
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
