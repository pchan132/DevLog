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

import { Button } from "./ui/button";
import { Settings, StickyNote } from "lucide-react";
import { useState, useEffect } from "react";

import ViewSystem from "./ViewSystem";

interface System {
  id: string;
  title: string;
  description?: string | null;
  notes: { id: string }[];
  createdAt: Date;
  flowData?: any;
  projectId: string;
}

interface CardSystemsProps {
  system: System;
}

export default function CardSystems({ system }: CardSystemsProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-500 " />
          <span className="max-w-[150px] sm:max-w-[200px] truncate">
            {system.title}
          </span>
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {system.description || "ไม่มีคำอธิบาย"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <StickyNote className="h-4 w-4" />
          <span>{system.notes.length} โน้ต</span>
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
