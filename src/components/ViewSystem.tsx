interface System {
  id: string;
  title: string;
  description?: string | null;
  notes: { id: string }[];
  createdAt: Date;
  flowData?: any;
  projectId: string;
}

interface ViewSystemProps {
  systemData: System;
}

export default function ViewSystem({ systemData }: ViewSystemProps) {
  return (
    <div>
      <div className="text-xl">{systemData.title}</div>
      <div className="text-gray-600 dark:text-gray-400">
        {systemData.description || "ไม่มีคำอธิบาย"}
      </div>
    </div>
  );
}
