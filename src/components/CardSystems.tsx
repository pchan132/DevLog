"use client";
import {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import ButtonDelete from "./ButtonDelete";
import ButtonEdit from "./ButtonEdit";
import ButtonlistNote from "./ButtonlistNote";
import { Button } from "./ui/button";
import {
  Settings,
  StickyNote,
  CheckCircle,
  Circle,
  PlayCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

import ViewSystem from "./ViewSystem";

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

interface CardSystemsProps {
  system: System;
  onSystemUpdated?: () => void; // ฟังก์ชันที่จะถูกเรียกเมื่อแก้ไข system สำเร็จ
}

export default function CardSystems({
  system,
  onSystemUpdated,
}: CardSystemsProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        {/* หัว */}
        <div className="flex items-center justify-between ">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-blue-500 " />
              <span className="max-w-[150px] sm:max-w-[200px] truncate">
                {system.title}
              </span>
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {system.description || "ไม่มีคำอธิบาย"}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {/* ปุ่มเพิ่ม โน๊ต */}
            <ButtonlistNote systemId={system.id} />
            {/* ปุ่ม Edit - ส่งข้อมูลทั้งหมดที่ต้องการให้ปุ่มแก้ไข */}
            <ButtonEdit
              systemId={system.id} // ส่ง ID ของ system
              projectId={system.projectId} // ส่ง ID ของ project
              onSystemUpdated={onSystemUpdated} // ส่งฟังก์ชันสำหรับรีเฟรช
            />
            {/* ปุ่ม Delete */}
            <ButtonDelete id={system.id} typeButton="system" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="space-y-3">
          {/* Status */}
          <div className="flex items-center gap-2">
            {system.status === "DONE" ? (
              <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            ) : system.status === "DOING" ? (
              <PlayCircle className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            ) : (
              <Circle className="h-4 w-4 text-gray-600 dark:text-gray-400" />
            )}
            <span
              className={`text-xs px-2 py-1 rounded-full ${
                system.status === "DONE"
                  ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400"
                  : system.status === "DOING"
                  ? "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400"
                  : "bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400"
              }`}
            >
              {system.status === "DONE"
                ? "สำเร็จ"
                : system.status === "DOING"
                ? "กำลังทำ"
                : "ยังไม่ได้ทำ"}
            </span>
          </div>

          {/* Notes Count */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <StickyNote className="h-4 w-4" />
            <span>{system.notes.length} โน้ต</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-4">
        {isMounted && (
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full">ดูรายละเอียด</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>รายละเอียดฟังก์ชั่น</DialogTitle>
                <DialogDescription>
                  แสดงรายละเอียดเกี่ยวกับฟังก์ชั่นและความสามารถของระบบนี้
                </DialogDescription>
              </DialogHeader>
              <ViewSystem systemData={system} />
            </DialogContent>
          </Dialog>
        )}
      </CardFooter>
    </Card>
  );
}
