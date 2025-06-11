"use client";

import React, { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { DialogClose } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { formRegisterSchema, TFormRegisterValues } from "./shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Asterisk, Eye, EyeOff } from "lucide-react";
import { RegisterUser } from "@/app/actions";
import { useAuthModalStore } from "@/store/authModal";
import { cn } from "@/lib/utils"; // Если у тебя нет, могу помочь написать

interface Props {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const RegisterForm: React.FC<Props> = ({ isLoading, setIsLoading }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const setVerifyModal = useAuthModalStore((state) => state.setVerifyModal);

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      setIsLoading(true);
      await RegisterUser(data);

      sessionStorage.setItem("fullName", data.fullName);
      sessionStorage.setItem("email", data.email);
      sessionStorage.setItem("password", data.password);

      setVerifyModal(true);
    } catch (err) {
      console.log("Error creating user:", err);
      setError("root", {
        type: "manual",
        message: err instanceof Error ? err.message : String(err),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div className="flex items-center gap-1">
          <Label htmlFor="fullName">Имя</Label>
          <Asterisk color="#fb2c37" width={12} height={12} />
        </div>
        <Input
          id="fullName"
          type="text"
          aria-invalid={!!errors.fullName}
          aria-describedby="fullName-error"
          className={cn(errors.fullName && "border-red-500 mb-2")}
          {...register("fullName")}
        />
        {errors.fullName && (
          <span
            id="fullName-error"
            role="alert"
            className="text-red-500 text-sm"
          >
            {errors.fullName.message}
          </span>
        )}

        <div className="flex items-center gap-1">
          <Label htmlFor="email">E-Mail</Label>
          <Asterisk color="#fb2c37" width={12} height={12} />
        </div>
        <Input
          id="email"
          type="email"
          aria-invalid={!!(errors.email || errors.root)}
          aria-describedby="email-error"
          className={cn((errors.email || errors.root) && "border-red-500 mb-2")}
          {...register("email")}
        />
        {(errors.email || errors.root) && (
          <span id="email-error" role="alert" className="text-red-500 text-sm">
            {errors.email?.message || errors.root?.message}
          </span>
        )}

        <div className="flex items-center gap-1">
          <Label htmlFor="password">Пароль</Label>
          <Asterisk color="#fb2c37" width={12} height={12} />
        </div>
        <div className={cn("relative", errors.password ? "mb-0" : "mb-5")}>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            aria-invalid={!!errors.password}
            aria-describedby="password-error"
            className={cn(errors.password && "border-red-500 mb-2")}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            tabIndex={-1}
            aria-label={showPassword ? "Скрыть пароль" : "Показать пароль"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <span
            id="password-error"
            role="alert"
            className="text-red-500 text-sm"
          >
            {errors.password.message}
          </span>
        )}

        <div className="flex items-center gap-1">
          <Label htmlFor="confirmPassword">Повторите пароль</Label>
          <Asterisk color="#fb2c37" width={12} height={12} />
        </div>
        <div
          className={cn("relative", errors.confirmPassword ? "mb-0" : "mb-5")}
        >
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby="confirmPassword-error"
            className={cn(errors.confirmPassword && "border-red-500 mb-2")}
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            tabIndex={-1}
            aria-label={
              showConfirmPassword ? "Скрыть пароль" : "Показать пароль"
            }
          >
            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.confirmPassword && (
          <span
            id="confirmPassword-error"
            role="alert"
            className="text-red-500 text-sm"
          >
            {errors.confirmPassword.message}
          </span>
        )}

        <Button
          loading={isLoading || isSubmitting}
          type="submit"
          variant={"default"}
        >
          Зарегистрироваться
        </Button>
      </form>

      <DialogClose asChild>
        <Button type="button" variant="secondary">
          Закрыть
        </Button>
      </DialogClose>
    </>
  );
};
