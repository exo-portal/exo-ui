import Link from "next/link";
import React from "react";

export default function HeaderTab() {
  return (
    <Link href="/" aria-label="Company Home" className="flex items-center">
      {/* Replace with your logo */}
      <span className="text-body-normal text-main-500 px-11 py-6 rounded-4xl border border-main-500 shadow-[0_0_24px_rgba(0,0,0,0.1)]">
        Logo
      </span>
    </Link>
  );
}
