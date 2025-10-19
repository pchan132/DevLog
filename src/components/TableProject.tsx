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
import { Trash, Pen, Eye, Folder } from "lucide-react";

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
      alert(
        `เกิดข้อผิดพลาด: ${
          error instanceof Error ? error.message : "ไม่สามารถลบโปรเจคได้"
        }`
      );
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
          <TableHead className="text-left py-3 px-4 font-medium text-foreground">
            ชื่อโปรเจค
          </TableHead>
          <TableHead className="text-left py-3 px-4 font-medium text-foreground">
            สถานะ
          </TableHead>
          <TableHead className="text-left py-3 px-4 font-medium text-foreground">
            วันที่สร้าง
          </TableHead>
          <TableHead className="text-center py-3 px-4 font-medium text-foreground">
            จัดการ
          </TableHead>
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
            <TableCell className="font-medium flex items-center">
              <Folder className="mx-2 my-3 inline-block items-center " />
              <div>
                {project.title}
                <p className="text-sm text-gray-300">${project.description}</p>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <span
                className={`text-sm text-foreground rounded-full px-2 py-1 shadow-md ${
                  project.status === "TODO"
                    ? "bg-red-400"
                    : project.status === "DOING"
                    ? "bg-yellow-200"
                    : "bg-gray-200"
                }`}
              >
                {project.status}
              </span>
            </TableCell>
            <TableCell className="font-medium">
              {project.createdAt.toLocaleDateString("th-TH")}
            </TableCell>
            <TableCell className="flex gap-2 text-center justify-center items-center">
              <Eye
                className="hover:text-green-800 cursor-pointer text-green-500"
                onClick={() => handleView(project.id)}
              />
              <Pen
                className="hover:text-blue-800 cursor-pointer text-blue-500"
                onClick={() => handleEdit(project.id)}
              />
              <Trash
                className="hover:text-red-800 cursor-pointer text-red-500"
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
