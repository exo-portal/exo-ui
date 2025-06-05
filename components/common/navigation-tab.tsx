import { cn } from "@/lib";
import React from "react";

interface NavItemInterface {
  name: string;
  href: string;
}

export default function NavigationTab() {
  const NAV_ITEMS: NavItemInterface[] = [
    { name: "Home", href: "#" },
    { name: "Home", href: "#" },
    { name: "Home", href: "#" },
  ];

  return (
    <nav
      className="max-w-fit border border-transparent px-4 py-2 rounded-full bg-background-50 shadow-[0_0_24px_rgba(0,0,0,0.1)]"
      aria-label="Main navigation"
    >
      <ul className="flex">
        {NAV_ITEMS.map((item: NavItemInterface, key: React.Key) => (
          <li className="gap-4 px-10 py-4" key={key}>
            <a
              href={item.href}
              className={cn(
                "text-neutral-50 text-body-normal font-normal",
                "hover:text-neutral-900 transition-colors duration-200",
                "focus:outline-none focus:ring-2 focus:ring-neutral-300",
                "focus:ring-offset-2 rounded-full"
              )}
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
