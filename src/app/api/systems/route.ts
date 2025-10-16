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
      { error: "Error Create System", detail: error },
      { status: 500 }
    );
  }
}

// READ all systems
export async function GET() {
  try {
    const systems = await prisma.system.findMany({
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
