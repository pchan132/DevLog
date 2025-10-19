import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import FormCreateProject from "@/components/FormCreateProject";

export default async function CreateProjectPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  return (
    <div className="bg-card text-card-foreground gap-6 rounded-xl py-6 px-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">สร้างโปรเจคใหม่</h1>
        <a
          href="/projects"
          className="bg-gray-500 text-white p-2 rounded-lg"
        >
          กลับ
        </a>
      </div>
      
      <div className="mt-6">
        <FormCreateProject />
      </div>
    </div>
  );
}
