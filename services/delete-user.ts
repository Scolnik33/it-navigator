import { instance } from "@/lib/api";

export const deleteUser = async (email: string) => {
  await instance.delete("/delete-user", {
    data: {
      email,
    },
  });
};
