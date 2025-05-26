import * as React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { PasswordEyeIcon, PasswordEyeOffIcon } from "../icons";

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
    if (inputSuffixIcon) {
      return (
        <div
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
        >
          {inputSuffixIcon}
        </div>
      );
    }

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
    <div className="relative">
      <input
        type={inputType}
        data-slot="input"
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
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
