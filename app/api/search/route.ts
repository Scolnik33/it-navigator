import { prisma } from "@/prisma/prisma-client";
import { STATUS } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("query")?.trim();

    if (!query) {
      return NextResponse.json([]);
    }

    const events = await prisma.event.findMany({
      where: {
        title: {
          contains: query,
          mode: "insensitive",
        },
        status: STATUS.ACCEPTED,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 5,
    });

    return NextResponse.json(events);
  } catch (err) {
    console.log("Error fetching search data:", err);
    return NextResponse.json({ message: "Failed to fetch search data" });
  }
}
