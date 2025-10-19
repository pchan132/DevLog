"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormCreateSystemProps {
  projectId?: string;
  onSuccess?: () => void;
}

export default function FormCreateSystem({
  projectId,
  onSuccess,
}: FormCreateSystemProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");

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
        // เคลียร์ฟอร์ม
        setTitle("");
        setDescription("");
        setStatus("TODO");

        // เรียก callback ถ้ามี
        if (onSuccess) {
          onSuccess();
        } else {
          // ถ้าไม่มี callback ให้รีเฟรชหน้า (สำหรับกรณีใช้ในหน้า create)
          router.refresh();
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        alert(
          `เกิดข้อผิดพลาด: ${errorData.message || "ไม่สามารถสร้างระบบได้"}`
        );
      }
    } catch (error) {
      alert(
        `เกิดข้อผิดพลาด: ${
          error instanceof Error ? error.message : "ไม่สามารถบันทึกระบบได้"
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
        <textarea
          id="title"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md h-50"
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
          className="w-full p-2 border rounded-md "
        >
          <option value="TODO" className="bg-black text-white">
            TODO
          </option>
          <option value="DOING" className="bg-black text-white">
            DOING
          </option>
          <option value="DONE" className="bg-black text-white">
            DONE
          </option>
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
