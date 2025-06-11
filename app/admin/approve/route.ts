import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json();

    await prisma.event.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "ACCEPTED",
      },
    });

    return NextResponse.json({ message: "Event approved successfully" });
  } catch (err) {
    console.log("Error approve event", err);
    return NextResponse.json(
      { error: "Failed to approve event" },
      { status: 500 }
    );
  }
}
