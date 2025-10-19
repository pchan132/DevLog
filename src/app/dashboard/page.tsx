// UI Card and icon
import SummaryCard from "@/components/SummaryCard";
import {
  Folder,
  Settings,
  StickyNote,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ดึงโปรเจคล่าสุด 5 โปรเจค
async function getRecentProjects() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return [];

  // ดึงโปรเจคล่าสุด 3 โปรเจค พร้อมนับระบบย่อยในแต่ละโปรเจค
  return await prisma.project.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
    take: 3,
    include: {
      systems: {
        select: { id: true },
      },
      _count: {
        select: { systems: true },
      },
    },
  });
}

// ดึงสถิติทั้งหมด ของผู้ใช้ โปรเจค ระบบย่อย และโน้ต กำลังทำ ทำเสร็จ
async function countStats() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return {
      projectCount: 0,
      systemCount: 0,
      notesCount: 0,
      completedCount: 0,
      doingCount: 0,
    };
  }
  // ดึงข้อมูลสถิติทั้งหมดแบบขนานเพื่อประสิทธิภาพ
  const [projectCount, systemCount, notesCount, completedCount, doingCount] =
    await Promise.all([
      // จำนวนโปรเจคทั้งหมดของผู้ใช้
      prisma.project.count({
        where: { userId: session.user.id },
      }),
      prisma.system.count({
        where: {
          project: {
            userId: session.user.id,
          },
        },
      }),
      prisma.note.count({
        where: {
          system: {
            project: {
              userId: session.user.id,
            },
          },
        },
      }),
      prisma.project.count({
        where: {
          status: "DONE",
          userId: session.user.id,
        },
      }),
      prisma.project.count({
        where: {
          status: "DOING",
          userId: session.user.id,
        },
      }),
    ]);

  return {
    projectCount,
    systemCount,
    notesCount,
    completedCount,
    doingCount,
  };
}

export default async function Dashboard() {
  const stats = await countStats();
  const recentProjects = await getRecentProjects();

  // คำนวณเปอร์เซ็นต์โปรเจคที่สำเร็จ
  const completionRate =
    stats.projectCount > 0
      ? Math.round((stats.completedCount / stats.projectCount) * 100)
      : 0;

  // ข้อมูลที่จะใส่ใน Card -------------------------------
  const cards = [
    {
      title: "โปรเจคทั้งหมด",
      value: stats.projectCount,
      icon: <Folder className="text-blue-500" />,
      color: "bg-blue-100 dark:bg-blue-900/20",
    },
    {
      title: "ฟีเจอร์ทั้งหมด",
      value: stats.systemCount,
      icon: <Settings className="text-green-500" />,
      color: "bg-green-100 dark:bg-green-900/20",
    },
    {
      title: "โน้ตทั้งหมด",
      value: stats.notesCount,
      icon: <StickyNote className="text-yellow-500" />,
      color: "bg-yellow-100 dark:bg-yellow-900/20",
    },
    {
      title: "กำลังดำเนินการ",
      value: stats.doingCount,
      icon: <Clock className="text-orange-500" />,
      color: "bg-orange-100 dark:bg-orange-900/20",
    },
    {
      title: "สำเร็จแล้ว",
      value: stats.completedCount,
      icon: <CheckCircle className="text-purple-500" />,
      color: "bg-purple-100 dark:bg-purple-900/20",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">แดชบอร์ด</h1>
        <p className="text-muted-foreground">
          ภาพรวมของโปรเจคและกิจกรรมล่าสุดของคุณ
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 lg:grid-cols-5">
        {cards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        {/* Completion Rate */}
        <div className="bg-card text-card-foreground rounded-xl p-6 shadow-sm border">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">อัตราความสำเร็จ</h3>
            <TrendingUp className="h-5 w-5 text-muted-foreground" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold">{completionRate}%</div>
            <div className="mt-2 w-full bg-secondary rounded-full h-2">
              <div
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${completionRate}%` }}
              ></div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {stats.completedCount} จาก {stats.projectCount} โปรเจค
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-card text-card-foreground rounded-xl p-6 shadow-sm border">
          <h3 className="text-lg font-semibold mb-4">ดำเนินการด่วน</h3>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            <Link
              href="/projects/create"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
            >
              <Folder className="mr-2 h-4 w-4" />
              สร้างโปรเจคใหม่
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background border border-input hover:bg-accent hover:text-accent-foreground h-10 py-2 px-4"
            >
              <Settings className="mr-2 h-4 w-4" />
              จัดการโปรเจค
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Projects */}
      <div className="bg-card text-card-foreground rounded-xl p-6 shadow-sm border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">โปรเจคล่าสุด</h3>
          <Link
            href="/projects"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            ดูทั้งหมด
          </Link>
        </div>

        {recentProjects.length > 0 ? (
          <div className="space-y-4">
            {recentProjects.map((project) => (
              <div
                key={project.id}
                className="flex items-center justify-between p-3 rounded-lg border bg-muted/50"
              >
                <div className="flex-1">
                  <h4 className="font-medium max-w-[150px] sm:max-w-[500px] truncate ">
                    {project.title}
                  </h4>
                  <p className="text-sm text-muted-foreground max-h-[20px] sm:max-h-[40px] truncate w-48">
                    {project.description || "ไม่มีคำอธิบาย"}
                  </p>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-xs text-muted-foreground flex items-center">
                      <Clock className="mr-1 h-3 w-3" />
                      {new Date(project.createdAt).toLocaleDateString("th-TH")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {project._count.systems} ระบบย่อย
                    </span>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.status === "DONE"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                          : project.status === "DOING"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                      }`}
                    >
                      {project.status === "DONE"
                        ? "สำเร็จ"
                        : project.status === "DOING"
                        ? "กำลังทำ"
                        : "ยังไม่ได้ทำ"}
                    </span>
                  </div>
                </div>
                <Link
                  href={`/projects/${project.id}`}
                  className="text-sm text-primary hover:underline"
                >
                  ดูรายละเอียด
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <Folder className="mx-auto h-12 w-12 opacity-50 mb-2" />
            <p>ยังไม่มีโปรเจค</p>
            <Link
              href="/projects/create"
              className="text-primary hover:underline mt-2 inline-block"
            >
              สร้างโปรเจคแรกของคุณ
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
