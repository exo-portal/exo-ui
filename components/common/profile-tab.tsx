import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Separator } from "../ui/separator";
import { NotificationIcon, SettingsIcon } from "../svg";
import Link from "next/link";
import { PATH } from "@/config";
import { getCurrentLocale } from "@/lib";

export default function ProfileTab() {
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
      <Link href={`/${getCurrentLocale()}/login}`}>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </Link>
    </div>
  );
}
