"use client";
// From CREATE and EDIT project

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

interface FormCreateProjectProps {
  initialData?: {
    title: string;
    description: string | null;
    status: string;
  };
  isEdit?: boolean;
  projectId?: string;
}

export default function FormCreateProject({
  initialData,
  isEdit = false,
  projectId,
}: FormCreateProjectProps) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("TODO");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description || "");
      setStatus(initialData.status);
    }
  }, [initialData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isEdit ? `/api/projects/${projectId}` : "/api/projects";
      const method = isEdit ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, description, status }),
      });

      if (response.ok) {
        alert(
          isEdit ? "อัปเดตโปรเจคเรียบร้อยแล้ว" : "สร้างโปรเจคเรียบร้อยแล้ว"
        );
        router.push("/projects");
        router.refresh();
      } else {
        const error = await response.json();
        alert(`เกิดข้อผิดพลาด: ${error.error || "ไม่สามารถบันทึกโปรเจคได้"}`);
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
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          ชื่อโปรเจค
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

      <div>
        <label htmlFor="description" className="block text-xl font-medium mb-1">
          รายละเอียด
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded-md h-32"
        />
      </div>

      {isEdit && (
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
      )}

      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "กำลังบันทึก..." : isEdit ? "อัปเดตโปรเจค" : "สร้างโปรเจค"}
      </button>
    </form>
  );
}
