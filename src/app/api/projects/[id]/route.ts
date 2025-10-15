import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// READ project เดียว
export async function GET(_: Request, { params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: {
      id: params.id,
    },
    include: {
      systems: true,
    },
  });

  return NextResponse.json(project);
}

// UPDATE project
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { title, description } = await req.json();
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
}

// DELETE project
export async function DELETE(_: Request, params: { params: { id: string } }) {
  await prisma.project.delete({ where: { id: params.params.id } });
  return NextResponse.json({ message: "Project deleted" });
}
