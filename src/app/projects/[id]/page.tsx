import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { notFound, redirect } from "next/navigation";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  const project = await prisma.project.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      systems: true,
    },
  });

  if (!project) {
    notFound();
  }

  return (
    <div className="bg-card text-card-foreground gap-6 rounded-xl py-6 px-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">{project.title}</h1>
        <div className="flex gap-2">
          <a
            href={`/projects/${project.id}/edit`}
            className="flex justify-center items-center bg-blue-500 text-white p-2 rounded-lg"
          >
            แก้ไขโปรเจค
          </a>
          <a
            href="/projects"
            className="flex justify-center items-center bg-gray-500 text-white p-2 rounded-lg"
          >
            กลับ
          </a>
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">รายละเอียดโปรเจค</h2>
        <p className="text-gray-600 mb-4">
          {project.description || "ไม่มีรายละเอียด"}
        </p>
        <p className="text-sm text-gray-500">สถานะ: {project.status}</p>
        <p className="text-sm text-gray-500">
          วันที่สร้าง: {project.createdAt.toLocaleDateString("th-TH")}
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">
          ระบบในโปรเจค ({project.systems.length})
        </h2>
        {project.systems.length === 0 ? (
          <p className="text-gray-500">ยังไม่มีระบบในโปรเจคนี้</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.systems.map((system) => (
              <div key={system.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{system.title}</h3>
                <p className="text-sm text-gray-600 mt-1">
                  {system.description || "ไม่มีรายละเอียด"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
