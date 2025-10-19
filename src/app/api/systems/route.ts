import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

// CREATE system
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description, projectId } = await req.json();
    
    // ตรวจสอบว่าผู้ใช้เป็นเจ้าของ project หรือไม่
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        userId: session.user.id,
      },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found or access denied" }, { status: 404 });
    }

    const newSystem = await prisma.system.create({
      data: {
        title,
        description,
        projectId,
      },
    });

    // ส่งไป ข้อมูลออกไป
    return NextResponse.json(newSystem, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error Create System", detail: error },
      { status: 500 }
    );
  }
}

// READ all systems
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const systems = await prisma.system.findMany({
      where: {
        project: {
          userId: session.user.id,
        },
      },
      include: {
        notes: true,
        // project: true,
      },
    });

    return NextResponse.json(systems, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      {
        error: "Error Get All systems",
        detail: error,
      },
      {
        status: 500,
      }
    );
  }
}
