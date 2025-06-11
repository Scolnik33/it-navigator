import React from "react";
import { getUserSession } from "@/lib/getUserSession";
import { Container } from "@/components/shared";
import { redirect } from "next/navigation";

export default async function Profile() {
  const session = await getUserSession();

  if (!session) {
    return redirect("/?auth=false");
  }

  return (
    <Container className="w-full min-h-screen flex items-center">
      <h1>dsada</h1>
      <h2>авыаываы</h2>
    </Container>
  );
}

// 21:29:09
