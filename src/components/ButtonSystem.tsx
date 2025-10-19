"use client";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
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

  const handleSystemCreated = () => {
    setOpen(false);
    if (onSystemCreated) {
      onSystemCreated();
    }
  };
  console.log(open);

  return (
    <div className="flex justify-between items-center mb-2">
      <span>ฟีเจอร์/ระบบในโปรเจคนี้</span>
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
          </DialogHeader>
          <FormCreateSystem
            projectId={projectId}
            onSuccess={handleSystemCreated}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
