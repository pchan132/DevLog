"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StickyNote, AlertCircle, CheckCircle, Lightbulb } from "lucide-react";

interface Note {
  id: string;
  content: string;
  type: "problem" | "solution" | "learning";
  createdAt: string;
}

interface CardNotesProps {
  noteId: string;
  systemId: string;
  systemTitle: string;
}

export default function CardNotes({ noteId, systemId, systemTitle }: CardNotesProps) {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(`/api/notes/${noteId}`);
        if (response.ok) {
          const data = await response.json();
          setNote(data);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchNote();
  }, [noteId]);

  const getIcon = (type: string) => {
    switch (type) {
      case "problem":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "solution":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "learning":
        return <Lightbulb className="h-5 w-5 text-yellow-500" />;
      default:
        return <StickyNote className="h-5 w-5 text-blue-500" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "problem":
        return "ปัญหา";
      case "solution":
        return "วิธีแก้ไข";
      case "learning":
        return "สิ่งที่เรียนรู้";
      default:
        return "โน้ต";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "problem":
        return "bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400";
      case "solution":
        return "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400";
      case "learning":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400";
      default:
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400";
    }
  };

  if (loading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-full"></div>
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="animate-pulse">
            <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-5/6"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!note) {
    return (
      <Card className="h-full flex flex-col">
        <CardContent className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">ไม่พบข้อมูลโน้ต</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getIcon(note.type)}
          <span className="truncate">{getTypeLabel(note.type)}</span>
        </CardTitle>
        <CardDescription className="text-xs">
          ระบบ: {systemTitle}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm line-clamp-3">{note.content}</p>
      </CardContent>
      <CardFooter className="pt-4 flex justify-between items-center">
        <span className="text-xs text-muted-foreground">
          {new Date(note.createdAt).toLocaleDateString("th-TH")}
        </span>
        <Link href={`/systems/${systemId}?note=${noteId}`}>
          <Button variant="outline" size="sm">
            ดูรายละเอียด
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}