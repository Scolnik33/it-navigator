import { prisma } from "@/prisma/prisma-client";
import { STATUS } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const offset = parseInt(req.nextUrl.searchParams.get("offset") || "0");

    const events = await prisma.event.findMany({
      where: {
        status: STATUS.WAITING,
      },
      skip: offset,
      take: 6,
    });

    return NextResponse.json(events);
  } catch (err) {
    console.error("Error fetching admin's events: ", err);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
