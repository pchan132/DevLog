"use client";
import { PlusCircle } from "lucide-react";

interface ButtonSystemProps {
  projectId: string;
}

export default function ButtonSystem({ projectId }: ButtonSystemProps) {
  return (
    <div className="flex justify-between items-center mb-2">
      <span>ฟีเจอร์/ระบบในโปรเจคนี้</span>
      <a
        // href={`/systemPage/create?projectId=${projectId}`}
        className="flex gap-2 border rounded-2xl cursor-pointer p-2"
      >
        <PlusCircle />
        เพิ่มฟิเจอร์
      </a>
    </div>
  );
}
