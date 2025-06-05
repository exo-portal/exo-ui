import ClientMainContainer from "@/components/container/client-main-container";
import { metaDataTitle } from "@/lib";
import { AutoLogoutProvider } from "@/providers";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: metaDataTitle("Project Team"),
  description:
    "Manage your project teams, assign roles, and collaborate efficiently within ExoPortal. Access team dashboards and user management features.",
  keywords: [
    "ExoPortal",
    "project team",
    "team management",
    "user roles",
    "collaboration",
    "dashboard",
    "project collaboration",
  ],
  openGraph: {
    title: metaDataTitle("Project Team"),
    description:
      "Collaborate with your project team, manage roles, and streamline workflows in ExoPortal.",
    url: "https://your-exoportal-domain.com/internal/project-team",
    siteName: "ExoPortal",
    type: "website",
  },
};

export default function ProjectTeamLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientMainContainer>
      <AutoLogoutProvider />
      {children}
    </ClientMainContainer>
  );
}
