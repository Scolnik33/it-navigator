import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    const education = await prisma.education.findFirst({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json(education);
  } catch (err) {
    console.log("Error fetching one education:", err);
    return NextResponse.json(
      { error: "Failed to fetch one education" },
      { status: 500 }
    );
  }
}
