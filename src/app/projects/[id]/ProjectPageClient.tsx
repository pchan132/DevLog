"use client";

import { useState } from "react";
import { ArrowLeft, PlusCircle } from "lucide-react";
import TabProject from "@/components/TabProject";
import CardSystems from "@/components/CardSystems";
import CardNotes from "@/components/CardNotes";
import Flowchart from "@/components/Flowchart";

interface System {
  id: string;
  title: string;
  description?: string | null;
  notes: { id: string }[];
  createdAt: Date;
  flowData?: any;
  projectId: string;
}

interface Project {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  systems: System[];
  createdAt: Date;
}

interface ProjectPageClientProps {
  project: Project;
}

const ProjectPageClient = ({ project }: ProjectPageClientProps) => {
  const [activeTab, setActiveTab] = useState("features");

  // รวบรวมโน้ตทั้งหมดจากระบบทั้งหมด
  const allNotes = project.systems.flatMap((system) =>
    system.notes.map((note) => ({
      ...note,
      systemId: system.id,
      systemTitle: system.title,
    }))
  );

  return (
    <div>
      <div className="p-6">
        <button>
          <a
            href="/projects"
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors mb-4"
          >
            <ArrowLeft className="inline-block mr-2" />
            กลับไปที่โปรเจค
          </a>
        </button>

        {/* Project Title and Description */}
        <div className="rounded-lg shadow mt-5">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold mb-2 text-foreground">
              {project.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
            <div className="mt-2">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  project.status === "DONE"
                    ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                    : project.status === "DOING"
                    ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                    : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
                }`}
              >
                {project.status === "DONE"
                  ? "สำเร็จ"
                  : project.status === "DOING"
                  ? "กำลังทำ"
                  : "ยังไม่ได้ทำ"}
              </span>
            </div>
          </div>
        </div>

        {/* tab */}
        <TabProject activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="mt-6">
          {activeTab === "features" && (
            <>
              <div className="flex justify-between items-center">
                <span>ฟีเจอร์/ระบบในโปรเจคนี้</span>
                <button className="flex gap-2 border rounded-2xl cursor-pointer p-2">
                  <PlusCircle />
                  เพิ่มฟิเจอร์
                </button>
              </div>{" "}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.systems.map((system) => (
                  <CardSystems key={system.id} system={system} />
                ))}
                {project.systems.length === 0 && (
                  <div className="col-span-full text-center py-8 text-muted-foreground">
                    <p>ยังไม่มีระบบย่อยในโปรเจคนี้</p>
                  </div>
                )}
              </div>
            </>
          )}

          {activeTab === "notes" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {allNotes.map((note) => (
                <CardNotes
                  key={note.id}
                  noteId={note.id}
                  systemId={note.systemId}
                  systemTitle={note.systemTitle}
                />
              ))}
              {allNotes.length === 0 && (
                <div className="col-span-full text-center py-8 text-muted-foreground">
                  <p>ยังไม่มีโน้ตในโปรเจคนี้</p>
                </div>
              )}
            </div>
          )}

          {activeTab === "flowchart" && (
            <Flowchart projectId={project.id} systems={project.systems} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectPageClient;
