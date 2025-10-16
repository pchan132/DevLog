import { prisma } from "@/lib/prisma";
import { error } from "console";
import { NextResponse } from "next/server";

// CREATE project -----------------------------
export async function POST(req: Request) {
  try {
    const { title, description, userId } = await req.json();

    // ต้องมี userId ส่งมา
    if (!userId) {
      return NextResponse.json(
        {
          error: "Project not UserId",
        },
        { status: 400 }
      );
    }

    // สร้างข้อมูลในฐานข้อมูล
    const newProject = await prisma.project.create({
      data: {
        title,
        description,
        userId,
      },
    });

    // ส่งข้อมูลที่สร้างใหม่กลับไปพร้อม status 201 (Created)
    return NextResponse.json(newProject, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Unable to creating Project", detail: error },
      { status: 500 }
    );
  }
}

// READ all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      include: {
        systems: true,
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({
      error: "Unable to fetch projects",
      detail: error,
    });
  }
}
