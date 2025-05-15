"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { axiosInstance } from "@/lib";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

export default function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleContinueToGithub = () => {
    window.location.href =
      "http://localhost:8080/api/auth/oauth2/authorization/github";
  };

  const handleContinueToGoogle = () => {
    window.location.href =
      "http://localhost:8080/api/auth/oauth2/authorization/google";
  };

  const submitRegister = (email: string, password: string) => {
    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }
    return axiosInstance
      .post("/api/auth/authentication/login", {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.isSuccess) {
          window.location.href = "/home";
        }
      })
      .catch((e) => {
        console.log("register error", e);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button onClick={handleContinueToGithub} variant={"default"}>
          Continue Using Github
        </Button>

        <Button onClick={handleContinueToGoogle} variant={"default"}>
          Continue Using Google
        </Button>
      </div>

      <form action="">
        <Label>Email</Label>
        <Input
          id="email"
          name="email"
          placeholder="Enter your email"
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            setEmail((e.target as HTMLInputElement).value);
          }}
          value={email}
        ></Input>

        <Label>Password</Label>
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          onInput={(e: React.FormEvent<HTMLInputElement>) => {
            setPassword((e.target as HTMLInputElement).value);
          }}
          value={password}
        ></Input>
      </form>
      <Button onClick={() => submitRegister(email, password)}>Submit</Button>
    </div>
  );
}
