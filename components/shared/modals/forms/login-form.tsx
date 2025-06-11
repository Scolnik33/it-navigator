"use client";

import React, { useState } from "react";
import { Button, Input, Label } from "@/components/ui";
import { DialogClose } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { formLoginSchema, TFormLoginValues } from "./shemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Asterisk, Eye, EyeOff } from "lucide-react";

interface Props {
  closeBtnRef: React.RefObject<HTMLButtonElement>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LoginForm: React.FC<Props> = ({
  closeBtnRef,
  isLoading,
  setIsLoading,
}) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TFormLoginValues>({
    resolver: zodResolver(formLoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onSubmit",
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (data: TFormLoginValues) => {
    try {
      setIsLoading(true);
      const resp = await signIn("credentials", {
        ...data,
        redirect: false,
      });

      if (!resp?.ok) {
        throw Error();
      }

      toast.success("Вы успешно вошли в аккаунт", {
        icon: "✅",
      });

      closeBtnRef.current.click();
    } catch (err) {
      console.log("ERROR [LOGIN]: ", err);
      setError("root", {
        type: "manual",
        message: "Неверный логин или пароль",
      });
      setIsLoading(false);
    }
  };

  return (
    <>
      <form
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="flex">
          <Label htmlFor="email">E-Mail</Label>
          <Asterisk color="#fb2c37" width={12} height={12} />
        </div>
        <Input
          id="email"
          type="email"
          className={errors.email && "border-red-500 mb-2"}
          {...register("email")}
        />
        {errors.email && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
        <div className="flex">
          <Label htmlFor="password">Пароль</Label>
          <Asterisk color="#fb2c37" width={12} height={12} />
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            className={errors?.password && "border-red-500 mb-2 pr-10"}
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errors.password && (
          <span className="text-red-500 text-sm">
            {errors.password.message}
          </span>
        )}
        {errors.root && (
          <span className="text-red-500 text-sm text-center">
            {errors.root?.message}
          </span>
        )}

        <Button
          loading={isLoading || isSubmitting}
          type="submit"
          variant={"default"}
          className="w-full"
        >
          Войти
        </Button>
      </form>
      <DialogClose asChild>
        <Button type="button" variant="secondary" ref={closeBtnRef}>
          Закрыть
        </Button>
      </DialogClose>
    </>
  );
};
