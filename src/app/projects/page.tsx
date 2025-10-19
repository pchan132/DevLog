// UI Components
import TableProject from "@/components/TableProject";

// ข้อมูล และ session
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function ProjectsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return (
      <div className="p-6 flex flex-col items-center justify-center">
        กรุณาเข้าสู่ระบบ
        <a href="/auth/signin" className="text-blue-500">
          เข้าสู่ระบบ
        </a>
      </div>
    );
  }

  const projects = await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="bg-card text-card-foreground gap-6 rounded-xl py-6 px-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold mb-4">โปรเจคของคุณ</h1>
        <a
          href="/projects/create"
          className="flex justify-center items-center bg-background border border-foreground p-2 rounded-lg"
        >
          สร้างโปรเจคใหม่
        </a>
      </div>
      <div className="flex mt-1 shadow-sm flex-col gap-4 border border-foreground rounded-2xl">
        <TableProject projects={projects} />
      </div>
    </div>
  );
}
