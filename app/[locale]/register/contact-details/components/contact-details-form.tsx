"use client";

import FormFieldInput, {
  OptionsInterface,
} from "@/components/form-field-input/form-field-input";
import { PHFlag, USFlag } from "@/components/national-flag";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { getCurrentLocale, translate } from "@/lib";
import { useAppStateStore, useRegistrationStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { RegisterOperations } from "../../functions/register-functions";
import { PATH } from "@/config";
import { useRouter } from "next/navigation";

export function ContactDetailsForm() {
  const { setIsLoading } = useAppStateStore();
  const { data, setData } = useRegistrationStore();
  const router = useRouter();
  const t = useTranslations();

  const FormSchema = z.object({
    phoneNumber: z.string().min(1, "Phone number is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    barangay: z.string().min(1, "Barangay is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    country: z.string().min(1, "Country is required"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      country: data.country || "PH",
      phoneNumber: data.phoneNumber || "",
      address: data.address || "",
      state: data.state || "",
      city: data.city || "",
      barangay: data.barangay || "",
      postalCode: data.postalCode || "",
    },
  });

  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading, data]);

  const onSubmit = ({
    country,
    phoneNumber,
    address,
    state,
    city,
    barangay,
    postalCode,
    
  }: z.infer<typeof FormSchema>) => {
    const trimData = {
      country: country.trim(),
      phoneNumber: phoneNumber.trim(),
      address: address.trim(),
      state: state.trim(),
      city: city.trim(),
      barangay: barangay.trim(),
      postalCode: postalCode.trim()
    };
    setData({
      ...data,
      ...trimData,
    });
    // Fetch from backend using the updated store data
    const updatedData = { ...data, ...trimData };
    setIsLoading(true);
    RegisterOperations.register(updatedData)
      .then((e) => {
        console.log(e);
        // router.push(PATH.HOME.getPath(getCurrentLocale()));
      })
      .catch((error) => {
        console.log("Error during registration:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const COUNTRY_OPTIONS = [
    { label: "Philippines", value: "Philippines" },
    { label: "United States", value: "United States" },
  ];
  const CITY_OPTIONS = [{ label: "Cebu City", value: "Cebu City" }];
  const STATE_OPTIONS = [{ label: "Cebu", value: "Cebu" }];
  const BRGY_OPTIONS = [{ label: "Quiot Pardo", value: "Quiot Pardo" }];
  const PHONE_OPTIONS: OptionsInterface[] = [
    { label: "PH", value: "PH", icon: PHFlag, countryCode: "+63" },
    { label: "US", value: "US", icon: USFlag, countryCode: "+1" },
  ];

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 w-[500px]"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {/* Country */}
        <FormFieldInput
          id="country"
          name={"country"}
          schema={FormSchema}
          control={form.control}
          labelKey="register.form.contactDetails.input.label.country"
          componentType="select"
          placeholderKey="register.form.contactDetails.input.placeholder.country"
          options={COUNTRY_OPTIONS}
        />

        {/* Phone Number */}
        <FormFieldInput
          id="phoneNumber"
          type="tel"
          name={"phoneNumber"}
          schema={FormSchema}
          control={form.control}
          autoComplete="on"
          componentType="tel"
          options={PHONE_OPTIONS}
          labelKey="register.form.contactDetails.input.label.phoneNumber"
          placeholderKey="register.form.contactDetails.input.placeholder.phoneNumber"
          countrySelected={form.watch("country") || "PH"}
          isFormDirty={form.formState.isDirty}
        />

        {/* Address */}
        <FormFieldInput
          id="address"
          name={"address"}
          schema={FormSchema}
          autoComplete="on"
          control={form.control}
          labelKey="register.form.contactDetails.input.label.address"
          placeholderKey="register.form.contactDetails.input.placeholder.address"
        />

        {/* State & City */}
        <div className="flex gap-4 items-start">
          <FormFieldInput
            id="state"
            name={"state"}
            schema={FormSchema}
            control={form.control}
            labelKey="register.form.contactDetails.input.label.state"
            placeholderKey="register.form.contactDetails.input.placeholder.state"
            componentType="select"
            options={STATE_OPTIONS}
          />
          <FormFieldInput
            id="city"
            name={"city"}
            schema={FormSchema}
            control={form.control}
            labelKey="register.form.contactDetails.input.label.city"
            componentType="select"
            placeholderKey="register.form.contactDetails.input.placeholder.city"
            options={CITY_OPTIONS}
          />
        </div>

        {/* Barangay & Postal code */}
        <div className="flex gap-4 items-start">
          <FormFieldInput
            id="barangay"
            name={"barangay"}
            schema={FormSchema}
            control={form.control}
            labelKey="register.form.contactDetails.input.label.barangay"
            placeholderKey="register.form.contactDetails.input.placeholder.barangay"
            componentType="select"
            options={BRGY_OPTIONS}
          />
          <FormFieldInput
            id="postalCode"
            name={"postalCode"}
            schema={FormSchema}
            control={form.control}
            autoComplete="on"
            labelKey="register.form.contactDetails.input.label.postalCode"
            placeholderKey="register.form.contactDetails.input.placeholder.postalCode"
          />
        </div>

        {/* Submit Button */}
        <Button className="mt-10" type="submit" variant={"default"}>
          {translate(t, "register.form.contactDetails.button.submit")}
        </Button>
      </form>
    </Form>
  );
}
