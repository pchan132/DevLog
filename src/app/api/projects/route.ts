// เอา userId จาก session แทนการรับจาก body

import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// NextAuth session handling can be added here if needed
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Session } from "inspector/promises";

interface Data {
  title: string;
  description?: string;
  status?: "TODO" | "DOING" | "DONE";
}

export async function GET(req: Request) {
  // optional: read query params for pagination/search
  try {
    // session check GET
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }

    const params = new URL(req.url).searchParams;
    const page = Number(params.get("page") ?? 1);
    const perPage = Number(params.get("perPage") ?? 20);

    const [projects, total] = await Promise.all([
      prisma.project.findMany({
        where: { userId: session.user.id }, // ดึงเฉพาะโปรเจคของผู้ใช้ที่ล็อกอิน ที่เก็บใน session
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * perPage,
        take: perPage,
      }),
      prisma.project.count({
        where: { userId: session.user.id },
      }),
    ]);

    return NextResponse.json({
      projects,
      total,
      page,
      perPage,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to fetch projects",
      },
      { status: 500 }
    );
  }
}

// ===============================
// POST - สร้าง project ใหม่ (ผูกกับ user)
// ===============================
export async function POST(req: Request) {
  try {
    // session check
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json(
        {
          error: "Unauthorized",
        },
        { status: 401 }
      );
    }
    const body: Data = await req.json();
    if (!body.title)
      return NextResponse.json({ error: "Title is required" }, { status: 400 });

    const newProject = await prisma.project.create({
      data: {
        title: body.title,
        description: body.description ?? null,
        status: body.status ?? "TODO",
        userId: session.user.id, // ✅ เพิ่มตรงนี้
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Failed to create project",
      },
      { status: 500 }
    );
  }
}
