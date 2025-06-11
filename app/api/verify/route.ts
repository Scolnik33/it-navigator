import { verificationUser } from "@/lib/verificationUser";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { code } = body;

    const success = await verificationUser(code);

    return NextResponse.json({ success });
  } catch (err) {
    console.log("Verification error:", err);
    return NextResponse.json(
      { error: "Failed to verify user" },
      { status: 500 }
    );
  }
}
