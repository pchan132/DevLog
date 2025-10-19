"use client";
import { useState } from "react";
import { Settings, StickyNote, GitBranch } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabProjectProps {
  onTabChange: (tab: string) => void;
  activeTab: string;
}

export default function TabProject({ onTabChange, activeTab }: TabProjectProps) {
  const tabs = [
    {
      id: "features",
      label: "ฟีเจอร์/ระบบ",
      icon: <Settings className="h-4 w-4 mr-2" />,
    },
    {
      id: "notes",
      label: "โน็ต",
      icon: <StickyNote className="h-4 w-4 mr-2" />,
    },
    {
      id: "flowchart",
      label: "ผังงาน",
      icon: <GitBranch className="h-4 w-4 mr-2" />,
    },
  ];

  return (
    <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "py-2 px-1 border-b-2 font-medium text-sm flex items-center transition-colors",
              activeTab === tab.id
                ? "border-blue-500 text-blue-600 dark:text-blue-400"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300"
            )}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
