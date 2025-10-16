import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// CREATE note
export async function POST(req: Request) {
  try {
    const { content, type, systemId } = await req.json();

    const newNote = await prisma.note.create({
      data: {
        content,
        type,
        systemId,
      },
    });

    return NextResponse.json(newNote);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!", detailError: error },
      { status: 500 }
    );
  }
}

// READ all note
export async function GET() {
  try {
    const netes = await prisma.note.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(netes);
  } catch (error) {
    return NextResponse.json(
      {
        error: "Something went wrong!",
        detailError: error,
      },
      {
        status: 500,
      }
    );
  }
}
