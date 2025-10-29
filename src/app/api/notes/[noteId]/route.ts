import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// READ one note
export async function GET(
  _: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const note = await prisma.note.findFirst({
      where: {
        id: params.noteId,
        system: {
          project: {
            userId: session.user.id,
          },
        },
      },
      include: {
        system: {
          select: {
            id: true,
            title: true,
            projectId: true,
          },
        },
      },
    });

    if (!note) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    return NextResponse.json(note);
  } catch (error) {
    console.error("Error fetching note:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch note",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// UPDATE note
export async function PUT(
  req: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, content, type } = await req.json();

    // ตรวจสอบว่า content เป็น JSON object
    if (typeof content !== "object") {
      return NextResponse.json(
        { error: "Invalid content format" },
        { status: 400 }
      );
    }

    // ตรวจสอบว่ามีข้อมูลที่จะอัพเดทหรือไม่
    if (!content && !type) {
      return NextResponse.json(
        { error: "At least one field (content or type) must be provided" },
        { status: 400 }
      );
    }

    // ตรวจสอบว่า note มีอยู่จริงและผู้ใช้เป็นเจ้าของ
    const existingNote = await prisma.note.findFirst({
      where: {
        id: params.noteId,
        system: {
          project: {
            userId: session.user.id,
          },
        },
      },
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    // ตรวจสอบค่าที่อนุญาตสำหรับ type
    if (type && !["problem", "solution", "learning"].includes(type)) {
      return NextResponse.json(
        { error: "Invalid type. Must be one of: problem, solution, learning" },
        { status: 400 }
      );
    }

    const updatedNote = await prisma.note.update({
      where: {
        id: params.noteId,
      },
      data: {
        ...(title && { title }),
        ...(content && { content }),
        ...(type && { type }),
      },
      include: {
        system: {
          select: {
            id: true,
            title: true,
            projectId: true,
          },
        },
      },
    });

    return NextResponse.json(updatedNote);
  } catch (error) {
    console.error("Error updating note:", error);
    return NextResponse.json(
      {
        error: "Failed to update note",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// DELETE note
export async function DELETE(
  _: Request,
  { params }: { params: { noteId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ตรวจสอบว่า note มีอยู่จริงและผู้ใช้เป็นเจ้าของก่อนลบ
    const existingNote = await prisma.note.findFirst({
      where: {
        id: params.noteId,
        system: {
          project: {
            userId: session.user.id,
          },
        },
      },
      select: { id: true, content: true },
    });

    if (!existingNote) {
      return NextResponse.json({ error: "Note not found" }, { status: 404 });
    }

    await prisma.note.delete({
      where: {
        id: params.noteId,
      },
    });

    return NextResponse.json({
      message: "Note deleted successfully",
      deletedNote: {
        id: existingNote.id,
        content: existingNote.content,
      },
    });
  } catch (error) {
    console.error("Error deleting note:", error);
    return NextResponse.json(
      {
        error: "Failed to delete note",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
