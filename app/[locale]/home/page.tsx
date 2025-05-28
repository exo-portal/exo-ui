"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib";
import { useAuthStore } from "@/store";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function HomePage() {
  const [user, setUser] = useState<any>({});
  const [providers, setProviders] = useState<string[]>([]);
  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    axiosInstance.get("/api/auth/user/get").then((res: any) => {
      setUser(res.data);
    });
  }, []);

  useEffect(() => {
    if (user && user.resultData) {
      const providerIds = [];
      if (user.resultData.githubId) {
        providerIds.push("github");
      }
      if (user.resultData.googleId) {
        providerIds.push("google");
      }
      if (user.resultData.emailId) {
        providerIds.push("email");
      }
      setProviders(providerIds);
    }
  }, [user]);

  const unbindLoginMethod = (data: {
    providerId: string;
    providerName: "google" | "github";
    userId: number;
  }) => {
    axiosInstance
      .post("/api/auth/login-method/unbind", data)
      .then((res) => {
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
        setUser(res.data);
      })
      .catch((e) => {
        console.error("Failed to fetch user", e);
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
          disabled={user?.resultData?.githubId && providers.length === 1}
          onClick={() => {
            if (user?.resultData?.githubId) {
              unbindLoginMethod({
                providerId: user.resultData.githubId,
                providerName: "github",
                userId: user.resultData.id,
              });
              return;
            } else {
              linkToGithub();
              return;
            }
          }}
          variant={user?.resultData?.githubId ? "destructive" : "default"}
        >
          {user?.resultData?.githubId
            ? "Disconnect to Github"
            : "Connect to Github"}
        </Button>

        <Button
          disabled={user?.resultData?.googleId && providers.length === 1}
          onClick={() => {
            if (user?.resultData?.googleId) {
              unbindLoginMethod({
                providerId: user.resultData.googleId,
                providerName: "google",
                userId: user.resultData.id,
              });
              return;
            } else {
              linkToGoogle();
              return;
            }
          }}
          variant={user?.resultData?.googleId ? "destructive" : "default"}
        >
          {user?.resultData?.googleId
            ? "Disconnect to Google"
            : "Connect to Google"}
        </Button>
        {user?.resultData?.emailId && (
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
