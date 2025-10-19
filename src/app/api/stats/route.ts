import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// user session
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json({
        projectCount: 0,
        systemCount: 0,
        notesCount: 0,
        completedCount: 0,
      });
    }

    // ดึงข้อมูลสถิติทั้งหมดแบบขนานเพื่อประสิทธิภาพ
    const [projectCount, systemCount, notesCount, completedCount] =
      await Promise.all([
        // จำนวนโปรเจคทั้งหมดของผู้ใช้
        prisma.project.count({
          where: { userId: session.user.id },
        }),

        // จำนวนระบบย่อยทั้งหมดของผู้ใช้
        prisma.system.count({
          where: {
            project: {
              userId: session.user.id,
            },
          },
        }),

        // จำนวนโน้ตทั้งหมดของผู้ใช้
        prisma.note.count({
          where: {
            system: {
              project: {
                userId: session.user.id,
              },
            },
          },
        }),

        // จำนวนโปรเจคที่สำเร็จแล้ว
        prisma.project.count({
          where: {
            status: "DONE",
            userId: session.user.id,
          },
        }),
      ]);

    return NextResponse.json({
      projectCount,
      systemCount,
      notesCount,
      completedCount,
    });
  } catch (error) {
    console.error("Error fetching stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch statistics" },
      { status: 500 }
    );
  }
}
