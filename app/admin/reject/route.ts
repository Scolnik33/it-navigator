import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id, reason, comment } = await req.json();

    const event = await prisma.event.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        userId: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { error: "Событие не найдено" },
        { status: 404 }
      );
    }

    await prisma.event.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "REJECTED",
      },
    });

    await prisma.notification.create({
      data: {
        title: reason,
        body: comment || "",
        userId: event.userId,
        eventId: Number(id),
      },
    });

    return NextResponse.json({ message: "Event rejected successfully" });
  } catch (err) {
    console.log("Error reject event", err);
    return NextResponse.json(
      { error: "Failed to reject event" },
      { status: 500 }
    );
  }
}
