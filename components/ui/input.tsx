import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import {
  PasswordEyeIcon,
  PasswordEyeOffIcon,
} from "../icons";

function Input({
  className,
  type,
  inputSuffixIcon,
  ...props
}: React.ComponentProps<"input"> & {
  inputSuffixIcon?: React.ReactNode;
}) {
  const [show, setShow] = React.useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && show ? "text" : type;

  const RenderInputIcon = () => {
    // If an input suffix icon is provided, render it
    if (inputSuffixIcon) {
      return (
        <div
          tabIndex={-1}
          className="absolute right-1.5 top-1/2 -translate-y-1/2 py-2 px-1"
        >
          {inputSuffixIcon}
        </div>
      );
    }

    // Render the password visibility toggle icon if the input type is password
    if (isPassword) {
      return (
        <div
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            <Image src={PasswordEyeIcon} alt="show-password-icon" />
          ) : (
            <Image src={PasswordEyeOffIcon} alt="hide-password-icon" />
          )}
        </div>
      );
    }
  };

  return (
    <div className="relative w-full">
      <input
        type={inputType}
        data-slot="input"
        aria-invalid={props["aria-invalid"] || false}
        className={cn(
          "bg-neutral-50 border border-neutral-200 placeholder:text-neutral-400 text-body-normal font-normal rounded-lg px-3.5 py-2.5 w-full outline-none text-neutral-800",
          "focus-visible:bg-main-50 focus-visible:border-main-400 focus-visible:ring-4 focus-visible:ring-main-100",
          "aria-invalid:border-danger-300 aria-invalid:bg-transparent aria-invalid:ring-4 aria-invalid:ring-danger-100",
          // "file:text-foreground placeholder:text-muted-foreground selection:bg-primary bg-neutral-50 focus:bg-main-50 selection:text-main-100 dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          // "focus-visible:border-ring focus-visible:ring-main-950/50 focus-visible:border-y-main-400 focus-visible:border-200 focus-visible:ring-[3px]",
          // "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          isPassword ? "pr-10" : "",
          className
        )}
        {...props}
      />
      {RenderInputIcon()}
    </div>
  );
}

export { Input };
