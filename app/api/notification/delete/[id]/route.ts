import { prisma } from "@/prisma/prisma-client";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    console.log(id);

    await prisma.notification.delete({
      where: {
        id: Number(id),
      },
    });

    return NextResponse.json({ message: "Notification deleted successfully" });
  } catch (err) {
    console.log("Error deleting notification:", err);
    return NextResponse.json(
      { error: "Failed to delete notification" },
      { status: 500 }
    );
  }
}
