"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormCreateSystemProps {
  projectId?: string;
}

export default function FormCreateSystem({ projectId }: FormCreateSystemProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  const [loading, setLoading] = useState(false);

  // เมื่อกด Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!projectId) {
      alert("ไม่พบ projectId กรุณาเริ่มจากหน้าโปรเจค");
      return;
    }

    setLoading(true);
    try {
      const url = `/api/systems`;
      const method = "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          status,
          projectId,
        }),
      });

      if (response.ok) {
        alert("สร้างระบบเรียบร้อยแล้ว");
        router.push(`/projects/${projectId}`);
        router.refresh();
      } else {
        router.push("/projects");
      }
    } catch (error) {
      alert(
        `เกิดข้อผิดพลาด: ${
          error instanceof Error ? error.message : "ไม่สามารถบันทึกโปรเจคได้"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-xl font-medium mb-1">
          ชื่อระบบ/ฟิเจอร์
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>
      {/* คำอธิบาย */}
      <div>
        <label className="block text-xl font-medium mb-1">คำอธิบาย</label>
        <input
          type="text"
          id="title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="status" className="block text-xl font-medium mb-1">
          สถานะ
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="TODO">TODO</option>
          <option value="DOING">DOING</option>
          <option value="DONE">DONE</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "กำลังบันทึก..." : "สร้างระบบ"}
      </button>
    </form>
  );
}
