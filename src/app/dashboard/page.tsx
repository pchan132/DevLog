// UI Card and icon
import SummaryCard from "@/components/SummaryCard";
import { Folder, Settings, StickyNote, CheckCircle } from "lucide-react";
import { title } from "process";

// ดึงข้อมูลจาก API stats เพื่อ นับ ผลรวม
async function getStats() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stats`, {
    cache: "no-store", // เพื่อดึงข้อมูลใหม่ทุกครั้ง
  });
  return res.json();
}

const stats = await getStats(); // เอาฟังก์ชั่น เรียก API มากใช้

export default async function Dashboard() {
  // ข้อมูลที่จะใส่ใน Card -------------------------------
  const cards = [
    {
      title: "โปรเจคทั้งหมด",
      value: stats.projectCount,
      icon: <Folder className="text-blue-500" />,
      color: "bg-blue-100",
    },
    {
      title: "ฟีเจอร์ทั้งหมด",
      value: stats.systemCount,
      icon: <Settings className="text-green-500" />,
      color: "bg-green-100",
    },
    {
      title: "โน้ตทั้งหมด",
      value: stats.notesCount,
      icon: <StickyNote className="text-yellow-500" />,
      color: "bg-yellow-100",
    },
    {
      title: "สำเร็จแล้ว",
      value: stats.completedCount,
      icon: <CheckCircle className="text-purple-500" />,
      color: "bg-purple-100",
    },
  ];

  return (
    <div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <SummaryCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}
