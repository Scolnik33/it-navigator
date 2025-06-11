import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const offset = parseInt(req.nextUrl.searchParams.get("offsetEducation") || "0");

    console.log(offset);

    const education = await prisma.education.findMany({
      skip: offset,
      take: 4,
    });

    return NextResponse.json(education);
  } catch (err) {
    console.log("Error fetching education data:", err);
    return NextResponse.json(
      { error: "Failed to fetch education data" },
      { status: 500 }
    );
  }
}
