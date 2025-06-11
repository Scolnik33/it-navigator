import { create } from "zustand";

interface AuthModalProps {
  VerifyModal: boolean;
  setVerifyModal: (value: boolean) => void;
}

export const useAuthModalStore = create<AuthModalProps>((set) => ({
  VerifyModal: false,
  setVerifyModal: (value) => set({ VerifyModal: value }),
}));
