import FormCreateSystem from "@/components/FormCreateSystem";

interface CreateSystemPageProps {
  searchParams: { projectId?: string };
}

export default function createSystem({ searchParams }: CreateSystemPageProps) {
  const projectId = searchParams.projectId;
  
  if (!projectId) {
    return (
      <div className="bg-card text-card-foreground gap-6 rounded-xl py-6 px-4 shadow-sm">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">ข้อผิดพลาด</h1>
          <a href={`/projects/${projectId}`} className="bg-gray-500 text-white p-2 rounded-lg">
            กลับ
          </a>
        </div>
        <div className="mt-6">
          <p className="text-red-500">ไม่พบ projectId กรุณาเริ่มจากหน้าโปรเจค</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-card text-card-foreground gap-6 rounded-xl py-6 px-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">สร้างระบบใหม่</h1>
        <a href="/projects" className="bg-gray-500 text-white p-2 rounded-lg">
          กลับ
        </a>
      </div>

      <div className="mt-6">
        <FormCreateSystem projectId={projectId} />
      </div>
    </div>
  );
}
