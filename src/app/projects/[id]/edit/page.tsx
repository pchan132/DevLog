"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import FormCreateProject from "@/components/FormCreateProject";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [projectId, setProjectId] = useState<string | null>(null);
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const unwrapParams = async () => {
      const { id } = await params;
      setProjectId(id);
    };
    
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (!projectId) return;
    
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${projectId}`);
        if (res.ok) {
          const data = await res.json();
          setProject(data);
        } else {
          setError("ไม่พบโปรเจค");
        }
      } catch (error) {
        setError("เกิดข้อผิดพลาดในการดึงข้อมูลโปรเจค");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <div className="bg-card text-card-foreground gap-6 rounded-xl py-6 px-4 shadow-sm">
        <div className="flex justify-center items-center h-64">
          <p>กำลังโหลด...</p>
        </div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="bg-card text-card-foreground gap-6 rounded-xl py-6 px-4 shadow-sm">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-red-500 mb-4">{error || "ไม่พบโปรเจค"}</p>
          <button
            onClick={() => router.back()}
            className="bg-gray-500 text-white p-2 rounded-lg"
          >
            กลับ
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card text-card-foreground gap-6 rounded-xl py-6 px-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">แก้ไขโปรเจค</h1>
        <button
          onClick={() => router.back()}
          className="bg-gray-500 text-white p-2 rounded-lg"
        >
          กลับ
        </button>
      </div>

      <div className="mt-6">
        <FormCreateProject
          initialData={project}
          isEdit={true}
          projectId={projectId || ""}
        />
      </div>
    </div>
  );
}
