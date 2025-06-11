import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(req: NextRequest) {
  try {
    const { email } = await req.json();

    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    await prisma.verificationCode.delete({
      where: {
        userId: user?.id,
      },
    });

    await prisma.user.delete({
      where: {
        email,
      },
    });

    return NextResponse.json({ message: "User deleted successfully" });
  } catch (err) {
    console.log("Error deleting user:", err);
    throw err;
  }
}
