"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Button } from "@/components/ui";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LogIn, LogOut } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { AuthModalItem } from "./auth-modal-item";
import AuthModalVerifyItem from "./auth-modal-verify-item";
import { useAuthModalStore } from "@/store/authModal";
import { deleteUser } from "@/services/delete-user";

export const AuthModal: React.FC = () => {
  const [isSigningOut, setIsSigningOut] = useState(false);
  const { data: session, status } = useSession();
  const verifyModal = useAuthModalStore((state) => state.VerifyModal);
  const setVerifyModal = useAuthModalStore((state) => state.setVerifyModal);

  const handleClose = useCallback(async () => {
    const email = sessionStorage.getItem("email");
    if (email) {
      try {
        await deleteUser(email);
      } catch (error) {
        console.error("Ошибка при удалении пользователя:", error);
      }
    }
    setVerifyModal(false);
  }, [setVerifyModal]);

  useEffect(() => {
    window.addEventListener("popstate", handleClose);
    return () => {
      window.removeEventListener("popstate", handleClose);
    };
  }, [handleClose]);

  return (
    <Dialog
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          handleClose();
        }
      }}
    >
      {session ? (
        <Button
          onClick={async () => {
            setIsSigningOut(true);
            await signOut({ callbackUrl: "/?logout=true" });
            setIsSigningOut(false);
          }}
          variant="outline"
          size="lg"
          loading={isSigningOut}
          aria-label="Выйти из аккаунта"
          className="justify-start"
        >
          Выйти
          <LogOut size={20} className="ml-2" />
        </Button>
      ) : (
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="lg"
            loading={status === "loading"}
            aria-label="Войти в аккаунт"
            className="justify-start"
          >
            Войти
            <LogIn size={20} className="ml-2" />
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className={verifyModal ? "sm:max-w-2xl p-8" : ""}>
        {verifyModal ? <AuthModalVerifyItem /> : <AuthModalItem />}
      </DialogContent>
    </Dialog>
  );
};
