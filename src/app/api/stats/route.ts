import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const projectCount = await prisma.project.count();
  const systemCount = await prisma.system.count();
  const notesCount = await prisma.note.count();
  const completedCount = await prisma.project.count({
    where: { status: "DONE" },
  });

  return NextResponse.json({
    projectCount,
    systemCount,
    notesCount,
    completedCount,
  });
}
