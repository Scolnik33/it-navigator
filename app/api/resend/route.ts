import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await req.json();
    const { to, subject, html, code } = body;

    const user = await prisma.user.findFirst({
      where: {
        email: to,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Пользователь не найден" },
        { status: 404 }
      );
    }

    await prisma.verificationCode.delete({
      where: { userId: user.id },
    });

    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        code,
      },
    });

    const data = await resend.emails.send({
      from: "onboarding@resend.dev",
      to,
      subject,
      html,
    });
    
    return NextResponse.json(data);
  } catch (err) {
    console.error("Resend email failed:", err);
    throw err;
  }
}
