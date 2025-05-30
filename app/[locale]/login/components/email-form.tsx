"use client";
import { Input } from "@/components/ui/input";
import React from "react";

export default function EmailForm() {
  return (
    <div className="flex flex-col gap-4">
      <Input placeholder="Enter your email"></Input>
      <Input placeholder="Enter your password"></Input>
    </div>
  );
}
