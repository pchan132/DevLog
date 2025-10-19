import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  try {
    const project = await prisma.project.findUnique({
      where: { id },
      include: { systems: true },
    });
    if (!project)
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    return NextResponse.json({ project });
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
  const body = await req.json();
  try {
    const updated = await prisma.project.update({
      where: { id },
      data: {
        title: body.title,
        description: body.description ?? null,
        status: body.status,
      },
    });

    return NextResponse.json({ project: updated });
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
  await prisma.project.delete({
    where: { id },
  });

  return NextResponse.json({ message: "Project deleted" });
}
