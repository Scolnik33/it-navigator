import { useSession } from "next-auth/react";

export const useAuthLoading = () => {
  const { status } = useSession();
  return status == "loading";
};
