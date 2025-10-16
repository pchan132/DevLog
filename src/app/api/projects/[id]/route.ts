import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// READ project เดียว
export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const project = await prisma.project.findUnique({
      where: {
        id: params.id,
      },
      include: {
        systems: true,
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error("Error fetching project:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch project",
        details:
          error instanceof Error ? error.message : "Unknown error Get Project",
      },
      { status: 500 }
    );
  }
}

// UPDATE project
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { title, description } = await req.json();
    // ทำการอัปเดทข้อมูล
    const update = await prisma.project.update({
      where: {
        id: params.id,
      },
      data: {
        title,
        description,
      },
    });

    return NextResponse.json(update);
  } catch (error) {
    console.error("Error updating project:", error);
    return NextResponse.json({
      error: "Error updating project",
      detail:
        error instanceof Error ? error.message : "Unknown error Update Project",
    });
  }
}

// DELETE project
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.project.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Project deleted" });
  } catch (error) {
    return NextResponse.json({
      error: "Error Delete Project",
      detail:
        error instanceof Error ? error.message : "Unknown error Delete Project",
    });
  }
}
