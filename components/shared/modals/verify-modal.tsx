"use client";

import { Container, Title } from "@/components/shared";
import EmailTemplate from "@/components/shared/email-template";
import { Button, InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui";
import { getVerificationCode } from "@/lib/getVerificationCode";
import { instance } from "@/services/axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { renderToStaticMarkup } from "react-dom/server";

export default function Verifing() {
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [timer, setTimer] = useState(60);
  const router = useRouter();

  const email = sessionStorage.getItem("email")!;
  const name = sessionStorage.getItem("fullName")!;

  useEffect(() => {
    if (timer > 0) {
      setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);
    }
  }, [timer]);

  const handleResendCode = async () => {
    try {
      setTimer(60);
      const code = getVerificationCode();

      const html = renderToStaticMarkup(
        EmailTemplate({ name, code })
      );

      await instance.post("/resend", {
        to: email,
        subject: "Подтверждение регистрации",
        html,
        code,
      });
    } catch (err) {
      console.log("Не удалось отправить код", err);
      toast.error("Не удалось отправить код", {
        icon: "❌",
      });
    }
  };

  const handleCode = useCallback(async () => {
    try {
      if (isLoading) return;
      setIsLoading(true);

      const res = await instance.post("/verify", {
        code,
      });

      const json = res.data;

      if (json.success) {
        router.push("/?verified=true");
      } else {
        toast.error("Неверный код", {
          icon: "❌",
        });
        setIsLoading(false);
      }
    } catch (err) {
      console.log("Не удалось отправить код", err);
      toast.error("Не удалось отправить код", {
        icon: "❌",
      });
      setIsLoading(false);
    }
  }, [code, isLoading, router]);

  useEffect(() => {
    if (code.length == 6) {
      handleCode();
    }
  }, [code]);

  return (
    <Container className="w-full flex justify-center flex-col items-center space-y-8">
      <Title
        className="text-center font-bold text-blue-500"
        text={`На почту ${email} было отправлено письмо с кодом для подтверждения регистрации`}
        size="md"
      />

      <InputOTP
        disabled={isLoading}
        maxLength={6}
        value={code}
        onChange={setCode}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={1} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={2} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={3} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={4} />
        </InputOTPGroup>
        <InputOTPGroup>
          <InputOTPSlot index={5} />
        </InputOTPGroup>
      </InputOTP>

      <Button
        variant={"default"}
        size={"lg"}
        disabled={timer > 0}
        onClick={handleResendCode}
      >
        Отправить повторно {timer > 0 ? "через " + timer : ""}
      </Button>
    </Container>
  );
}
