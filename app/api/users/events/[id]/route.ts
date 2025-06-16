import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
    });

    const events = await prisma.event.findMany({
      where: {
        userId: user?.id,
      },
    });

    return NextResponse.json(events);
  } catch (err) {
    console.log("Error fetching users events:", err);
    return NextResponse.json(
      { error: "Failed to fetch users events" },
      { status: 500 }
    );
  }
}
