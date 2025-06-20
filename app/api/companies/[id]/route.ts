import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } } 
) {
  try {
    const id = context.params.id;

    const company = await prisma.company.findFirst({
      where: { id: Number(id) },
    });

    return NextResponse.json(company);
  } catch (err) {
    console.error("Error fetching one company:", err);
    return NextResponse.json({ error: "Failed to fetch one company" }, { status: 500 });
  }
}
