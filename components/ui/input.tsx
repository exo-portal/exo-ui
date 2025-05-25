import * as React from "react";
import { cn } from "@/lib/utils";

function Input({
  className,
  type,
  inputSuffixIcon,
  ...props
}: React.ComponentProps<"input"> & {
  showEyeIcon?: boolean;
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
        <button
          type="button"
          tabIndex={-1}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted-foreground"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? (
            // Eye open icon
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24">
              <path
                stroke="currentColor"
                strokeWidth="2"
                d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          ) : (
            // Eye closed icon
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.3536 2.35355C13.5488 2.15829 13.5488 1.84171 13.3536 1.64645C13.1583 1.45118 12.8417 1.45118 12.6464 1.64645L10.6828 3.61012C9.70652 3.21671 8.63759 3 7.5 3C4.30786 3 1.65639 4.70638 0.0760002 7.23501C-0.0253338 7.39715 -0.0253334 7.60288 0.0760014 7.76501C0.902945 9.08812 2.02314 10.1861 3.36061 10.9323L1.64645 12.6464C1.45118 12.8417 1.45118 13.1583 1.64645 13.3536C1.84171 13.5488 2.15829 13.5488 2.35355 13.3536L4.31723 11.3899C5.29348 11.7833 6.36241 12 7.5 12C10.6921 12 13.3436 10.2936 14.924 7.76501C15.0253 7.60288 15.0253 7.39715 14.924 7.23501C14.0971 5.9119 12.9769 4.81391 11.6394 4.06771L13.3536 2.35355ZM9.90428 4.38861C9.15332 4.1361 8.34759 4 7.5 4C4.80285 4 2.52952 5.37816 1.09622 7.50001C1.87284 8.6497 2.89609 9.58106 4.09974 10.1931L9.90428 4.38861ZM5.09572 10.6114L10.9003 4.80685C12.1039 5.41894 13.1272 6.35031 13.9038 7.50001C12.4705 9.62183 10.1971 11 7.5 11C6.65241 11 5.84668 10.8639 5.09572 10.6114Z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>
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
