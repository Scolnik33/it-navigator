import { prisma } from "@/prisma/prisma-client";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const companies = await prisma.company.findMany();

    return NextResponse.json(companies);
  } catch (err) {
    console.log("Error fetching companies data:", err);
    return NextResponse.json(
      { error: "Failed to fetch companies data" },
      { status: 500 }
    );
  }
}
