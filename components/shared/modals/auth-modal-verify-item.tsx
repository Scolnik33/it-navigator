"use client";

import React, { useEffect, useState } from "react";
import { Container, Title } from "@/components/shared";
import EmailTemplate from "@/components/shared/email-template";
import { Button } from "@/components/ui";
import { getVerificationCode } from "@/lib/getVerificationCode";
import { instance } from "@/services/axios";
import toast from "react-hot-toast";
import { renderToStaticMarkup } from "react-dom/server";
import { DialogClose } from "@/components/ui/dialog";
import { useCloseButtonRef } from "@/hooks/useCloseButtonRef";
import { FieldError, useForm } from "react-hook-form";
import { VerificationCodeInput } from "./verificationCodeInput";
import { signIn } from "next-auth/react";

export default function AuthModalVerifyItem() {
  const {
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const closeBtnRef = useCloseButtonRef();

  // Получаем данные из sessionStorage с fallback на пустую строку
  const name = sessionStorage.getItem("fullName") || "";
  const email = sessionStorage.getItem("email") || "";
  const password = sessionStorage.getItem("password") || "";

  useEffect(() => {
    if (timer > 0) {
      const timeoutId = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [timer]);

  const resendCode = async () => {
    try {
      setTimer(60);
      setCode("");
      clearErrors();

      const newCode = getVerificationCode();
      const html = renderToStaticMarkup(EmailTemplate({ name, code: newCode }));

      await instance.post("/resend", {
        to: email,
        subject: "Подтверждение регистрации",
        html,
        code: newCode,
      });

      toast.success("Код отправлен повторно");
    } catch (err) {
      console.error("Не удалось отправить код", err);
      toast.error("Не удалось отправить код", { icon: "❌" });
    }
  };

  const verifyCode = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const { data } = await instance.post("/verify", { code });

      if (data.success) {
        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        closeBtnRef.current?.click();
        toast.success("Вы успешно зарегистрировались", { icon: "✅" });
      } else {
        setError("code", {
          type: "manual",
          message: "Неверный код",
        });
      }
    } catch (err) {
      console.error("Ошибка при проверке кода", err);
      toast.error("Не удалось проверить код", { icon: "❌" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (code.length === 6) {
      verifyCode();
    } else if (code.length < 6) {
      clearErrors("code");
    }
  }, [code]);

  const errorClass = errors.code ? "border-red-500 text-red-500" : "";

  return (
    <Container className="w-full flex flex-col items-center justify-center">
      <Title
        className="text-center font-bold text-blue-500 mb-8"
        size="md"
        text={`На почту ${email} было отправлено письмо с кодом для подтверждения регистрации`}
      />

      <VerificationCodeInput
        code={code}
        setCode={setCode}
        errorClass={errorClass}
        isLoading={isLoading}
      />

      {errors.code && (
        <span className="text-red-500 text-md mt-2">
          {(errors.code as FieldError)?.message}
        </span>
      )}

      <DialogClose asChild>
        <Button
          ref={closeBtnRef}
          type="button"
          variant="secondary"
          className="hidden"
        >
          Закрыть
        </Button>
      </DialogClose>

      <Button
        variant="default"
        size="lg"
        disabled={timer > 0}
        onClick={resendCode}
        className="mt-8"
      >
        Отправить повторно {timer > 0 ? `через ${timer}` : ""}
      </Button>
    </Container>
  );
}
