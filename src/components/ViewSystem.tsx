"use client";

import {
  Calendar,
  Clock,
  StickyNote,
  Settings,
  CheckCircle,
  Circle,
  PlayCircle,
  ChevronRight,
} from "lucide-react";

interface System {
  id: string;
  title: string;
  description?: string | null;
  status: string;
  notes: { id: string; content: string; type: string }[];
  createdAt: Date;
  flowData?: any;
  projectId: string;
}

interface ViewSystemProps {
  systemData: System;
}

export default function ViewSystem({ systemData }: ViewSystemProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "DONE":
        return {
          label: "สำเร็จ",
          icon: CheckCircle,
          color: "text-green-600 dark:text-green-400",
          bgColor: "bg-green-100 dark:bg-green-900/20",
        };
      case "DOING":
        return {
          label: "กำลังทำ",
          icon: PlayCircle,
          color: "text-blue-600 dark:text-blue-400",
          bgColor: "bg-blue-100 dark:bg-blue-900/20",
        };
      default:
        return {
          label: "ยังไม่ได้ทำ",
          icon: Circle,
          color: "text-gray-600 dark:text-gray-400",
          bgColor: "bg-gray-100 dark:bg-gray-900/20",
        };
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  const getNoteTypeStats = () => {
    const stats = {
      problem: 0,
      solution: 0,
      learning: 0,
    };

    systemData.notes.forEach((note) => {
      if (note.type in stats) {
        stats[note.type as keyof typeof stats]++;
      }
    });

    return stats;
  };

  const statusInfo = getStatusInfo(systemData.status);
  const noteStats = getNoteTypeStats();
  const StatusIcon = statusInfo.icon;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Settings className="h-6 w-6 text-blue-500" />
            <h2 className="text-2xl font-bold text-foreground">
              {systemData.title}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${statusInfo.bgColor} ${statusInfo.color}`}
            >
              <StatusIcon className="h-4 w-4" />
              {statusInfo.label}
            </span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">
          คำอธิบาย
        </h3>
        <p className="text-foreground leading-relaxed">
          {systemData.description || "ไม่มีคำอธิบาย"}
        </p>
      </div>

      {/* Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Created Date */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-semibold text-muted-foreground">
              วันที่สร้าง
            </h4>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground text-sm">
              {formatDate(systemData.createdAt)}
            </span>
          </div>
        </div>

        {/* System ID */}
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-semibold text-muted-foreground">
              รหัสระบบ
            </h4>
          </div>
          <code className="text-xs bg-muted px-2 py-1 rounded text-foreground">
            {systemData.id}
          </code>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-card border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <StickyNote className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-semibold text-muted-foreground">
              โน้ตทั้งหมด ({systemData.notes.length})
            </h4>
          </div>
        </div>

        {systemData.notes.length > 0 ? (
          <div className="space-y-3">
            {/* Note Statistics */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
                <div className="text-lg font-semibold text-red-600 dark:text-red-400">
                  {noteStats.problem}
                </div>
                <div className="text-xs text-red-600 dark:text-red-400">
                  ปัญหา
                </div>
              </div>
              <div className="text-center p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="text-lg font-semibold text-green-600 dark:text-green-400">
                  {noteStats.solution}
                </div>
                <div className="text-xs text-green-600 dark:text-green-400">
                  วิธีแก้
                </div>
              </div>
              <div className="text-center p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
                  {noteStats.learning}
                </div>
                <div className="text-xs text-blue-600 dark:text-blue-400">
                  บทเรียน
                </div>
              </div>
            </div>

            {/* Recent Notes Preview */}
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {systemData.notes.slice(0, 3).map((note, index) => (
                <div
                  key={note.id}
                  className="flex items-start gap-2 p-2 bg-muted/50 rounded-lg"
                >
                  <ChevronRight className="h-3 w-3 text-muted-foreground mt-1 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full ${
                          note.type === "problem"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : note.type === "solution"
                            ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                        }`}
                      >
                        {note.type === "problem"
                          ? "ปัญหา"
                          : note.type === "solution"
                          ? "วิธีแก้"
                          : "บทเรียน"}
                      </span>
                    </div>
                    <p className="text-sm text-foreground line-clamp-2">
                      {note.content}
                    </p>
                  </div>
                </div>
              ))}
              {systemData.notes.length > 3 && (
                <div className="text-center text-xs text-muted-foreground pt-2">
                  และอีก {systemData.notes.length - 3} โน้ต...
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <StickyNote className="h-8 w-8 mx-auto mb-2 opacity-50" />
            <p className="text-sm">ยังไม่มีโน้ตในระบบนี้</p>
          </div>
        )}
      </div>

      {/* Flowchart Data Section */}
      {systemData.flowData && (
        <div className="bg-card border rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-4 w-4 text-muted-foreground" />
            <h4 className="text-sm font-semibold text-muted-foreground">
              ข้อมูล Flowchart
            </h4>
          </div>
          <div className="bg-muted/50 rounded-lg p-3">
            <pre className="text-xs text-foreground overflow-x-auto whitespace-pre-wrap">
              {JSON.stringify(systemData.flowData, null, 2)}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
