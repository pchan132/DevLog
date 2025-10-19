"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GitBranch, Plus, Edit } from "lucide-react";

interface System {
  id: string;
  title: string;
  description?: string | null;
  flowData?: any;
  createdAt: Date;
  notes: { id: string }[];
  projectId: string;
}

interface FlowchartProps {
  projectId: string;
  systems: System[];
}

export default function Flowchart({ projectId, systems }: FlowchartProps) {
  const [flowData, setFlowData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ในอนาคตอาจจะดึงข้อมูล flowchart จาก API
    // ตอนนี้ใช้ข้อมูลจาก systems ที่มีอยู่
    const initialFlowData = {
      nodes: systems.map((system, index) => ({
        id: system.id,
        type: "default",
        position: { x: (index % 3) * 250, y: Math.floor(index / 3) * 150 },
        data: {
          label: system.title,
          description: system.description,
        },
      })),
      edges: [],
    };

    setFlowData(initialFlowData);
    setLoading(false);
  }, [systems]);

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            ผังงานโปรเจค
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="animate-pulse">กำลังโหลดผังงาน...</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <GitBranch className="h-5 w-5" />
            ผังงานโปรเจค
          </CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Edit className="h-4 w-4 mr-2" />
              แก้ไขผังงาน
            </Button>
            <Button size="sm">
              <Plus className="h-4 w-4 mr-2" />
              เพิ่มโหนด
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {systems.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-center">
            <GitBranch className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">ยังไม่มีผังงาน</h3>
            <p className="text-muted-foreground mb-4">
              เริ่มสร้างระบบย่อยก่อน จากนั้นจึงสร้างผังงานเพื่อเชื่อมโยงการทำงาน
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              สร้างระบบย่อยแรก
            </Button>
          </div>
        ) : (
          <div className="relative">
            {/* Simple Flowchart Visualization */}
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 min-h-[400px]">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {systems.map((system, index) => (
                  <div
                    key={system.id}
                    className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <h4 className="font-medium">{system.title}</h4>
                    </div>
                    {system.description && (
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {system.description}
                      </p>
                    )}
                    <div className="mt-2 text-xs text-muted-foreground">
                      Node {index + 1}
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Connection Lines (Simple visualization) */}
              {systems.length > 1 && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    สามารถลากเพื่อเชื่อมโยงระบบย่อยในผังงานได้ในโหมดแก้ไข
                  </p>
                </div>
              )}
            </div>
            
            {/* Note about flowchart functionality */}
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-medium text-blue-800 dark:text-blue-400 mb-2">
                คำแนะนำการใช้ผังงาน
              </h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• คลิก "แก้ไขผังงาน" เพื่อเริ่มสร้างการเชื่อมโยงระหว่างระบบย่อย</li>
                <li>• ลากเส้นเพื่อเชื่อมโยงการทำงานระหว่างระบบ</li>
                <li>• คลิก "เพิ่มโหนด" เพื่อสร้างจุดเชื่อมต่อหรือขั้นตอนเพิ่มเติม</li>
                <li>• บันทึกผังงานเพื่อใช้ในการอ้างอิงการทำงาน</li>
              </ul>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}