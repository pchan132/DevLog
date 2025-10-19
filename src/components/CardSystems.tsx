import React from "react";
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
import { Settings, StickyNote } from "lucide-react";

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
  return (
    <Card className="h-full flex flex-col hover:shadow-md transition-shadow duration-200">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5 text-blue-500" />
          {system.title}
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
        <Link href={`/systems/${system.id}`} className="w-full">
          <Button variant="outline" className="w-full">
            ดูรายละเอียด
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
