import { prisma } from "@/prisma/prisma-client";

export const verificationUser = async (code: string) => {
  const verificationCode = await prisma.verificationCode.findFirst({
    where: {
      code,
    },
  });

  if (!verificationCode) {
    return false;
  }

  if (verificationCode) {
    await prisma.verificationCode.delete({
      where: {
        id: verificationCode.id,
      },
    });

    await prisma.user.findFirst({
      where: {
        id: verificationCode.userId,
      },
    });

    await prisma.user.update({
      where: {
        id: verificationCode.userId,
      },
      data: {
        verified: new Date(),
      },
    });

    return true;
  }
};
