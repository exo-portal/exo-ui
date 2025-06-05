import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { NotificationIcon, SettingsIcon } from "../svg";
import { usePathname } from "next/navigation";
import ClientLink from "./client-link";

export default function ProfileTab() {
  const pathname = usePathname();

  return (
    <div className="py-2 flex gap-4 items-center bg-background-50 px-4 rounded-4xl shadow-[0_0_24px_rgba(0,0,0,0.1)]">
      <div className="flex gap-4 items-center">
        <button className="flex gap-4 items-center cursor-pointer group">
          <NotificationIcon className="stroke-neutral-300 group-hover:stroke-main-500 group-focus:stroke-main-500" />
        </button>
        <button className="flex gap-4 items-center cursor-pointer group">
          <SettingsIcon className="stroke-neutral-300 group-hover:stroke-main-500 group-focus:stroke-main-500" />
        </button>
      </div>
      <Separator
        orientation="vertical"
        style={{ height: "51px", width: "2px" }}
      />
      <ClientLink
        href={pathname.endsWith("/profile") ? pathname : `${pathname}/profile`}
        passHref
        prefetch={true}
        isClickable={!pathname.endsWith("/profile")}
      >
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </ClientLink>
    </div>
  );
}
