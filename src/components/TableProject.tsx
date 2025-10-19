"use client";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";

// Icons
import { Trash, Pen, Eye } from "lucide-react";

import { useRouter } from "next/navigation";

interface TableProjectProps {
  projects: {
    title: string;
    id: string;
    createdAt: Date;
    userId: string;
    description: string | null;
    status: string;
  }[];
}

export default function TableProject({ projects }: TableProjectProps) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    // Handle delete action
    if (!confirm("คุณแน่ใจหรือว่าต้องการลบโปรเจคนี้?")) return;

    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("ลบโปรเจคเรียบร้อยแล้ว");
        router.refresh();
      } else {
        const error = await res.json();
        alert(`เกิดข้อผิดพลาด: ${error.error || "ไม่สามารถลบโปรเจคได้"}`);
      }
    } catch (error) {
      alert(`เกิดข้อผิดพลาด: ${error instanceof Error ? error.message : "ไม่สามารถลบโปรเจคได้"}`);
    }
  };

  const handleView = (id: string) => {
    router.push(`/projects/${id}`);
  };

  const handleEdit = (id: string) => {
    router.push(`/projects/${id}/edit`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-left font-bold">ชื่อโปรเจค</TableHead>
          <TableHead className="text-left font-bold">สถานะ</TableHead>
          <TableHead className="text-left font-bold">วันที่สร้าง</TableHead>
          <TableHead className="text-center font-bold">จัดการ</TableHead>
        </TableRow>
      </TableHeader>
      {!projects ||
        (projects.length === 0 && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                ไม่มีข้อมูลโปรเจค
              </TableCell>
            </TableRow>
          </TableFooter>
        ))}

      <TableBody>
        {projects.map((project) => (
          <TableRow key={project.id}>
            <TableCell>{project.title}</TableCell>
            <TableCell>{project.status}</TableCell>
            <TableCell>{project.createdAt.toLocaleDateString('th-TH')}</TableCell>
            <TableCell className="flex gap-2 text-center justify-center items-center">
              <Eye
                className="hover:text-green-800 cursor-pointer"
                onClick={() => handleView(project.id)}
              />
              <Pen
                className="hover:text-blue-800 cursor-pointer"
                onClick={() => handleEdit(project.id)}
              />
              <Trash
                className="hover:text-red-800"
                onClick={() => {
                  handleDelete(project.id);
                }}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
