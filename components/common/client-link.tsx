import { useAppStateStore } from "@/store";
import Link, { LinkProps } from "next/link";
import React, { ReactNode } from "react";

type ClientLinkProps = LinkProps & {
  children: ReactNode;
  className?: string;
  isClickable?: boolean;
};

export default function ClientLink({
  children,
  isClickable,
  ...props
}: ClientLinkProps) {
  const { setIsLoading } = useAppStateStore();

  return (
    <Link
      {...props}
      onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (!isClickable) {
          e.preventDefault();
          return;
        }
        setIsLoading(true);
        if (props.onClick) props.onClick(e);
      }}
    >
      {children}
    </Link>
  );
}
