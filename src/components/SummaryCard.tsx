"use client";

// UI
import { Card, CardContent } from "@/components/ui/card";
// icon

interface SummaryCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

export default function SummaryCard({
  title,
  value,
  icon,
  color,
}: SummaryCardProps) {
  return (
    <Card className="flex items-center gap-4 p-4">
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      <CardContent className="p-0">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-sm font-semibold">{value}</p>
      </CardContent>
    </Card>
  );
}
