"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {};

export default function page({}: Props) {
  const [user, setUser] = useState<any>({});
  const [providers, setProviders] = useState<String[]>([]);

  const searchParams = useSearchParams();
  useEffect(() => {
    const token = searchParams.get("token"); // Extract token from query params if passed
    if (token) {
      console.log("Token received from query params:", token);
      // Cookies.set("jwt", token, { secure: true, sameSite: "Strict" });
    } else {
      // Retrieve token from cookies if not in query params
      const cookieToken = document.cookie
        .split("; ")
        .find((row) => row.startsWith("tkn="))
        ?.split("=")[1];
      if (cookieToken) {
        console.log("Token retrieved from cookies:", cookieToken);
      } else {
        console.log("No token received");
      }
    }
  }, [searchParams]);

  useEffect(() => {
    axiosInstance
      .get("/api/auth/user/get")
      .then((res: any) => {
        console.log("fetch user", res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log("fetch user error", e);
        // window.location.href = "/auth/login";
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

  const logoutHandler = () => {
    axiosInstance
      .post("/api/auth/authentication/logout")
      .then(() => {
        window.location.href = "/auth/login";
      })
      .catch(() => {
        window.location.href = "/auth/login";
      });
  };

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

      <Button onClick={logoutHandler}>Logout</Button>

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
