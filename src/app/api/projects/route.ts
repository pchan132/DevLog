import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// CREATE project -----------------------------
export async function POST(req: Request) {
  try {
    const { title, description, userId } = await req.json();
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        userId,
      },
    });

    // ส่งไป ข้อมูลออกไป
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong!", realError: error },
      { status: 500 }
    );
  }
}

// READ all projects
export async function GET() {
  const projects = await prisma.project.findMany({
    include: {
      systems: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(projects);
}
