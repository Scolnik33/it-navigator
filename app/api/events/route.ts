import { prisma } from "@/prisma/prisma-client";
import { EventFilter } from "@/store/sections";
import { STATUS } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const paidParam = req.nextUrl.searchParams.get("paid");
    const onlineParam = req.nextUrl.searchParams.get("online");
    const offset = parseInt(req.nextUrl.searchParams.get("offset") || "0");

    const whereClause: EventFilter = {
      status: STATUS.ACCEPTED,
    };

    if (paidParam === "true") whereClause.paid = true;
    else if (paidParam === "false") whereClause.paid = false;

    if (onlineParam === "true") whereClause.online = true;
    else if (onlineParam === "false") whereClause.online = false;

    const events = await prisma.event.findMany({
      where: whereClause,
      skip: offset,
      take: 6,
    });

    return NextResponse.json(events);
  } catch (err) {
    console.error("Error fetching events: ", err);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}
