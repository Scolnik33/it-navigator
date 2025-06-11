"use server";

import EmailTemplate from "@/components/shared/email-template";
import {
  TFormAddEventValues,
  TFormRegisterValues,
} from "@/components/shared/modals/forms/shemas";
import { getVerificationCode } from "@/lib/getVerificationCode";
import { sendEmail } from "@/lib/send-email";
import { prisma } from "@/prisma/prisma-client";
import { hashSync } from "bcrypt";

export async function CreateEvent(data: TFormAddEventValues) {
  try {
    const userExists = await prisma.user.findFirst({
      where: { id: data.userId },
    });

    if (!userExists) {
      throw new Error(`Пользователь с id=${data.userId} не найден`);
    }

    await prisma.event.create({
      data: {
        ...data,
      },
    });
  } catch (err) {
    console.log("ERROR [CREATE EVENT BACKAND]: ", err);
    throw err;
  }
}

export async function RegisterUser(data: TFormRegisterValues) {
  try {
    const userExists = await prisma.user.findFirst({
      where: { email: data.email },
    });

    if (userExists) {
      throw new Error("Пользователь с таким email уже зарегистрирован");
    }

    const user = await prisma.user.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        password: hashSync(data.password, 10),
      },
    });

    const code = getVerificationCode();

    await prisma.verificationCode.create({
      data: {
        userId: user.id,
        code,
      },
    });

    await sendEmail(
      user.email,
      "Подтверждение регистрации",
      EmailTemplate({ name: user.fullName, code })
    );
  } catch (err) {
    console.log("ERROR [REGISTER USER BACKAND]: ", err);
    throw err;
  }
}
