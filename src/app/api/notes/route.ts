import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// CREATE note
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { content, type, systemId } = await req.json();
    
    // ตรวจสอบว่าผู้ใช้เป็นเจ้าของ system หรือไม่
    const system = await prisma.system.findFirst({
      where: {
        id: systemId,
        project: {
          userId: session.user.id,
        },
      },
    });

    if (!system) {
      return NextResponse.json({ error: "System not found or access denied" }, { status: 404 });
    }

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
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const notes = await prisma.note.findMany({
      where: {
        system: {
          project: {
            userId: session.user.id,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return NextResponse.json(notes);
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
