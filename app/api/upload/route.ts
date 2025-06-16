import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_ANON_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "Файл не найден" }, { status: 400 });
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `events/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const fileBuffer = new Uint8Array(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("uploads")
      .upload(filePath, fileBuffer, {
        contentType: file.type,
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      console.error("Ошибка при загрузке:", uploadError);
      return NextResponse.json(
        { error: "Ошибка при загрузке файла" },
        { status: 500 }
      );
    }

    const { data } = supabase.storage.from("uploads").getPublicUrl(filePath);

    return NextResponse.json({ url: data.publicUrl }, { status: 200 });
  } catch (error) {
    console.error("Ошибка сервера:", error);
    return NextResponse.json({ error: "Ошибка сервера" }, { status: 500 });
  }
}
