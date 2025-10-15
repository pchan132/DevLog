import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// CREATE system
export async function POST(req: Request) {
  try {
    const { title, description, projectId } = await req.json();
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
      { error: "Something went wrong!", realError: error },
      { status: 500 }
    );
  }
}

// READ all systems
export async function GET() {
  const systems = await prisma.system.findMany({
    include: {
      notes: true,
      // project: true,
    },
  });

  return NextResponse.json(systems);
}
