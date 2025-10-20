"use client";
import { PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormCreateSystem from "./FormCreateSystem";

interface ButtonSystemProps {
  projectId: string;
  onSystemCreated?: () => void;
}

export default function ButtonSystem({
  projectId,
  onSystemCreated,
}: ButtonSystemProps) {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSystemCreated = () => {
    setOpen(false);
    if (onSystemCreated) {
      onSystemCreated();
    }
  };

  return (
    <div className="flex justify-between items-center mb-2">
      <span>ฟีเจอร์/ระบบในโปรเจคนี้</span>
      {isMounted && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button className="flex gap-2 border rounded-2xl cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
              <PlusCircle />
              เพิ่มฟิเจอร์
            </button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>เพิ่มฟีเจอร์/ระบบใหม่</DialogTitle>
              <DialogDescription>
                กรอกข้อมูลเพื่อเพิ่มฟีเจอร์หรือระบบใหม่ในโปรเจคนี้
              </DialogDescription>
            </DialogHeader>
            <FormCreateSystem
              projectId={projectId}
              onSuccess={handleSystemCreated}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
