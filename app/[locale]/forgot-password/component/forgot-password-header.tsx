import React from "react";

export default function ForgotPasswordHeader() {
  return (
    <div className="flex flex-col gap-2 text-center min-w-lg flex-1">
      <h1 className="text-sub-heading-4 font-bold text-neutral-950">
        Forgot Password
      </h1>
      <p className="text-neutral-500 text-body-normal">
        Please enter your email address or phone number, to receive a reset
        password link.
      </p>
    </div>
  );
}
