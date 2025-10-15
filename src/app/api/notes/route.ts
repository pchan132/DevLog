import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// CREATE note
export async function POST(req: Request) {
  const { content, type, systemId } = await req.json();

  const newNote = await prisma.note.create({
    data: {
      content,
      type,
      systemId,
    },
  });

  return NextResponse.json(newNote);
}

// READ all note
export async function GET() {
  const netes = await prisma.note.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });
  return NextResponse.json(netes);
}
