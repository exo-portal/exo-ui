"use client";

import FormFieldInput from "@/components/form-field-input";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { translate } from "@/lib";
import { useAppStateStore } from "@/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function ContactDetailsForm() {
  const { setIsLoading } = useAppStateStore();
  const t = useTranslations();

  // Simulate loading state
  useEffect(() => {
    setIsLoading(false);
  }, [setIsLoading]);

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
      country: "",
      phoneNumber: "",
      address: "",
      state: "",
      city: "",
      barangay: "",
      postalCode: "",
    },
  });

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
      postalCode: postalCode.trim(),
    };
    // TODO: Handle form submission, e.g., send to API or store in state
    console.log("Submitted Data:", trimData);
  };

  const COUNTRY_OPTIONS = [{ label: "Philippines", value: "ph" }];
  const CITY_OPTIONS = [{ label: "Cebu City", value: "cc" }];
  const STATE_OPTIONS = [{ label: "Cebu", value: "cb" }];
  const BRGY_OPTIONS = [{ label: "Quiot Pardo", value: "qp" }];

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
          labelKey="register.form.contactDetails.input.label.phoneNumber"
          placeholderKey="register.form.contactDetails.input.placeholder.phoneNumber"
          options={CITY_OPTIONS}
        />

        {/* Address */}
        <FormFieldInput
          id="address"
          type="input"
          name={"address"}
          schema={FormSchema}
          control={form.control}
          labelKey="register.form.contactDetails.input.label.address"
          placeholderKey="register.form.contactDetails.input.placeholder.address"
        />

        {/* State & City */}
        <div className="flex gap-4">
          <FormFieldInput
            id="state"
            type="input"
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
        <div className="flex gap-4">
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
