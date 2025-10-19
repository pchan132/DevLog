import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// user session
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projectCount = await prisma.project.count({
    where: { userId: session.user.id },
  });
  const systemCount = await prisma.system.count({
    where: {
      project: {
        userId: session.user.id,
      },
    },
  });
  const notesCount = await prisma.note.count({
    where: {
      system: {
        project: {
          userId: session.user.id,
        },
      },
    },
  });
  const completedCount = await prisma.project.count({
    where: { status: "DONE", userId: session.user.id },
  });

  return NextResponse.json({
    projectCount,
    systemCount,
    notesCount,
    completedCount,
  });
}
