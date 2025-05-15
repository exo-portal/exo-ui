"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib";
import { useAuthStore } from "@/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

type Props = {};

export default function page({}: Props) {
  const [user, setUser] = useState<any>({});
  const [providers, setProviders] = useState<String[]>([]);

  useEffect(() => {
    axiosInstance
      .get("/api/auth/user/get")
      .then((res: any) => {
        console.log("fetch user", res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log("fetch user error", e);
      });
  }, []);

  useEffect(() => {
    if (user && user.resultData) {
      const providerIds = [];
      if (user.resultData.githubProviderId) {
        providerIds.push("github");
      }
      if (user.resultData.googleProviderId) {
        providerIds.push("google");
      }
      if (user.resultData.emailProvider) {
        providerIds.push("email");
      }
      setProviders(providerIds);
    }
  }, [user]);

  useEffect(() => {
    console.log("providers", providers);
    console.log("providers", providers.length);
  }, [providers]);

  const { logout } = useAuthStore();

  const unbindLoginMethod = (data: {
    providerId: String;
    providerName: "google" | "github";
    userId: number;
  }) => {
    axiosInstance
      .post("/api/auth/login-method/unbind", data)
      .then((res) => {
        console.log("unbind success", res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.error("Unbind failed", e);
      });
  };

  const linkToGithub = () => {
    window.location.href =
      "http://localhost:8080/api/auth/oauth2/authorization/github?linking=true";
  };

  const linkToGoogle = () => {
    window.location.href =
      "http://localhost:8080/api/auth/oauth2/authorization/google?linking=true";
  };

  const unlinkEmail = () => {
    axiosInstance
      .post("/api/auth/login-method/unbind-email", {
        id: user.resultData.id,
      })
      .then((res) => {
        console.log("unbind email success", res.data);
        setUser(res.data);
      });
  };

  return (
    <div>
      {user && user.resultData ? (
        <div>
          {user.resultData?.avatarUrl && (
            <Image
              src={user.resultData?.avatarUrl}
              alt="avatar"
              width={100}
              height={100}
            />
          )}

          <div>{user.resultData?.email}</div>
          <div>{user.resultData?.fullName}</div>
        </div>
      ) : (
        <>User not found</>
      )}

      <Button onClick={logout}>Logout</Button>

      <div className="flex gap-2">
        <Button
          disabled={
            user?.resultData?.githubProviderId && providers.length === 1
          }
          onClick={() => {
            if (user?.resultData?.githubProviderId) {
              unbindLoginMethod({
                providerId: user.resultData.githubProviderId,
                providerName: "github",
                userId: user.resultData.id,
              });
              return;
            } else {
              linkToGithub();
              return;
            }
          }}
          variant={
            user?.resultData?.githubProviderId ? "destructive" : "default"
          }
        >
          {user?.resultData?.githubProviderId
            ? "Disconnect to Github"
            : "Connect to Github"}
        </Button>

        <Button
          disabled={
            user?.resultData?.googleProviderId && providers.length === 1
          }
          onClick={() => {
            if (user?.resultData?.googleProviderId) {
              unbindLoginMethod({
                providerId: user.resultData.googleProviderId,
                providerName: "google",
                userId: user.resultData.id,
              });
              return;
            } else {
              linkToGoogle();
              return;
            }
          }}
          variant={
            user?.resultData?.googleProviderId ? "destructive" : "default"
          }
        >
          {user?.resultData?.googleProviderId
            ? "Disconnect to Google"
            : "Connect to Google"}
        </Button>
        {user?.resultData?.emailProvider && (
          <div className="flex flex-col gap-4">
            <Button
              onClick={unlinkEmail}
              disabled={providers.length === 1}
              variant={"destructive"}
            >
              Email Connected Remove Email
            </Button>
            <Input
              value={user?.resultData?.email}
              readOnly
              placeholder="Email"
            />
          </div>
        )}
      </div>
    </div>
  );
}
