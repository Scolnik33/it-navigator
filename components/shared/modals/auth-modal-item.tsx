"use client";

import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import React, { useState } from "react";
import { Title } from "../title";
import { LoginForm, RegisterForm } from "./forms";
import { Button } from "@/components/ui";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useCloseButtonRef } from "@/hooks/useCloseButtonRef";

export const AuthModalItem: React.FC = () => {
  const closeBtnRef = useCloseButtonRef();
  const [type, setType] = useState<"login" | "register">("login");
  const [isLoading, setIsLoading] = useState(false);

  const onSwitchType = () => {
    setType(type == "login" ? "register" : "login");
  };

  const handleSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      await signIn(provider, {
        callbackUrl: "/",
        redirect: true,
      });
    } catch (err) {
      console.log(err);
      toast.error("Не удалось войти в аккаунт");
      setIsLoading(false);
    }
  };

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          <Title
            className="font-bold text-blue-500 mb-3"
            text={type == "login" ? "Вход в аккаунт" : "Регистрация"}
            size="md"
          />
        </DialogTitle>
      </DialogHeader>

      {type == "login" ? (
        <LoginForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          closeBtnRef={closeBtnRef}
        />
      ) : (
        <RegisterForm
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}

      <hr />

      <div className="flex justify-between">
        <Button
          type="submit"
          variant={"ghost"}
          className="basis-full"
          onClick={() => handleSignIn("github")}
          loading={isLoading}
        >
          <img
            src="/images/github.png"
            alt="github-image"
            width={20}
            height={20}
          />
          GitHub
        </Button>
        {/* <Button
          type="submit"
          variant={"ghost"}
          className="basis-1/2"
          onClick={() => handleSignIn("google")}
          loading={isLoading}
        >
          <img
            src="/images/google.png"
            alt="google-image"
            width={20}
            height={20}
          />
          Google
        </Button> */}
      </div>

      <Button
        loading={isLoading}
        type="submit"
        variant={"outline"}
        onClick={onSwitchType}
      >
        {type == "login" ? "Регистрация" : "Авторизация"}
      </Button>
    </>
  );
};
