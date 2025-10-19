import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const project = await prisma.project.findFirst({
      where: {
        id,
        userId: session.user.id
      },
      include: { systems: true },
    });
    
    if (!project)
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to fetch project",
      },
      { status: 500 }
    );
  }
}

// ===============================
// UPDATE project ตาม id
// ===============================
export async function PUT(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  const { id } = params;
  
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ตรวจสอบว่าผู้ใช้เป็นเจ้าของ project หรือไม่
    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        userId: session.user.id
      },
    });
    
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    const body = await req.json();
    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description ?? null,
        status: body.status,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to update project",
      },
      { status: 500 }
    );
  }
}

// ===============================
// DELETE project ตาม id
// ===============================
export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // ตรวจสอบว่าผู้ใช้เป็นเจ้าของ project หรือไม่
    const existingProject = await prisma.project.findFirst({
      where: {
        id,
        userId: session.user.id
      },
    });
    
    if (!existingProject) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    await prisma.project.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to delete project",
      },
      { status: 500 }
    );
  }
}
