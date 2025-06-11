import { instance } from "./axios";

export const deleteUser = async (email: string) => {
  await instance.delete("/delete-user", {
    data: {
      email,
    },
  });
};
