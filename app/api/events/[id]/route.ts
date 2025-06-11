import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const event = await prisma.event.findFirst({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(event);
  } catch (err) {
    console.log("Error fetching one event:", err);
    return NextResponse.json(
      { error: "Failed to fetch one event" },
      { status: 500 }
    );
  }
}
