"use client";
import { NotebookPen } from "lucide-react";
import { useState, useEffect } from "react";

import Link from "next/link";
import TableNote from "./TableNote";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ButtonNewNote {
  systemId: string;
  onNoteCreate?: () => void;
}

export default function ButtonlistNote({
  systemId,
  onNoteCreate,
}: ButtonNewNote) {
  const [open, setOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNoteCreated = () => {
    setOpen(false);
    if (onNoteCreate) {
      onNoteCreate();
    }
  };

  return (
    <div className="flex justify-between items-center mb-2">
      {isMounted && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <NotebookPen
              className=" text-yellow-300       // สีปกติ
            hover:text-yellow-700       // สีเมื่อ hover
            cursor-pointer            // เปลี่ยนเป็นรูปมือเมื่อ hover
            transition-colors         // เอฟเฟกต์การเปลี่ยนสี"
            />
          </DialogTrigger>
          {/* // Form เมื่อเปิด */}
          <DialogContent className="">
            <DialogHeader>
              <div className="flex justify-between">
                <DialogTitle className="flex flex-col">
                  <span className="text-start">โน็ต</span>
                  <DialogDescription>
                    โน็ตทั้งหมดของ ฟีเจอร์นี้
                  </DialogDescription>
                </DialogTitle>

                <Link
                  href="/note"
                  className="flex gap-2 border rounded-2xl cursor-pointer p-2 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors mr-3"
                >
                  เพิ่มโน็ต
                </Link>
              </div>
            </DialogHeader>
            <TableNote></TableNote>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
