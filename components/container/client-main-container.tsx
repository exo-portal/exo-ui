"use client";

import { cn } from "@/lib";
import NavigationTab from "../common/navigation-tab";
import HeaderTab from "../common/header-tab";
import ProfileTab from "../common/profile-tab";

export default function ClientMainContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <main
      className={cn("relative min-h-screen h-screen bg-neutral-100", className)}
    >
      <header className="flex items-center justify-between pt-8 px-24">
        <HeaderTab />
        <NavigationTab />
        <ProfileTab />
      </header>
      {children}
    </main>
  );
}
