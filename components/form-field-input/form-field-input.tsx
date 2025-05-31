"use client";

import { useTranslations } from "next-intl";
import React, { useEffect, useState } from "react";
import { cn, translate } from "@/lib";
import { TxKeyPath } from "@/i18n";
import { z } from "zod";
import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
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
import {
  generatePhoneFieldPlaceholder,
  TypeTelInput,
} from "./form-field-input-function";
import { PHFlag } from "../national-flag";

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
  labelKey?: TxKeyPath;
  placeholderKey?: TxKeyPath;
  inputSuffixIcon?: React.ReactNode;
  componentType?:
    | "input"
    | "select"
    | "textarea"
    | "checkbox"
    | "radio"
    | "datePicker"
    | "tel"
    | "otp-input";
  options?: OptionsInterface[];
  autoComplete?: React.HTMLInputAutoCompleteAttribute | undefined;
  countrySelected?: string;
  enableClear?: boolean;
  isFormDirty?: boolean;
  maxLength?: number;
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
  countrySelected = "PH",
  enableClear = true,
  isFormDirty = false,
  maxLength,
}: FormFieldInputProps) {
  const t = useTranslations();

  const componentRender = (
    field: ControllerRenderProps<FieldValues, string>,
    fieldState: ControllerFieldState
  ) => {
    const { value, onChange } = field;
    switch (componentType) {
      case "otp-input":
        return (
          <InputOTP maxLength={maxLength ? maxLength : 6} {...field}>
            <InputOTPGroup>
              {Array.from({ length: maxLength ? maxLength : 6}).map(
                (_, index) => (
                  <InputOTPSlot
                    key={index}
                    aria-invalid={fieldState.invalid}
                    index={index}
                  />
                )
              )}
            </InputOTPGroup>
          </InputOTP>
        );
      case "tel":
        const [country, setCountry] = useState<string>("PH");

        const COUNTRY_CODE =
          options.find((opt) => opt.value === country)?.countryCode || "+64";

        useEffect(() => {
          if (!countrySelected) return;
          if (!isFormDirty) return;

          setCountry(countrySelected);
          onChange("");
        }, [countrySelected, isFormDirty]);

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
                enableClear={false}
              >
                <SelectValue
                  placeholder={<>{<Image src={PHFlag} alt={"PH Flag"} />}PH</>}
                />
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
              {...field}
              value={value}
              placeholder={generatePhoneFieldPlaceholder(country)}
              type="tel"
              autoComplete={autoComplete}
              aria-invalid={fieldState.invalid}
              inputSuffixIcon={inputSuffixIcon}
              id={id}
              isInputGroup
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
            placeholder={placeholderKey ? translate(t, placeholderKey) : ""}
          />
        );
      case "select":
        const handleOnclear = () => {
          onChange("");
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
              enableClear={enableClear}
            >
              <SelectValue
                placeholder={placeholderKey ? translate(t, placeholderKey) : ""}
              />
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
            placeholder={placeholderKey ? translate(t, placeholderKey) : ""}
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
            maxLength={255}
            type={type}
            aria-invalid={fieldState.invalid}
            inputSuffixIcon={inputSuffixIcon}
            {...field}
            placeholder={placeholderKey ? translate(t, placeholderKey) : ""}
          />
        );
    }
  };

  return (
    <FormField
      control={control}
      name={name as string}
      render={({ field, fieldState }) => (
        <FormItem
          className={cn(
            "w-full justify-center",
            componentType === "otp-input" && "justify-center"
          )}
        >
          <FormLabel className="text-neutral-600 font-medium" htmlFor={id}>
            {labelKey ? translate(t, labelKey) : ""}
          </FormLabel>
          <FormControl>{componentRender(field, fieldState)}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
