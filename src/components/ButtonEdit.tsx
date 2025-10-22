// นำเข้าไอคอนปากกาสำหรับปุ่มแก้ไข
import { Pen } from "lucide-react";

// นำเข้าส่วนประกอบของหน้าต่าง dialog (popup)
import {
  Dialog,
  DialogContent, // ส่วนเนื้อหาของ dialog
  DialogDescription, // คำอธิบาย dialog
  DialogHeader, // ส่วนหัวของ dialog
  DialogTitle, // ชื่อของ dialog
  DialogTrigger, // ปุ่มที่เปิด dialog
} from "@/components/ui/dialog";

// นำเข้าฟอร์มสร้าง/แก้ไข system
import FormCreateSystem from "./FormCreateSystem";

// นำเข้า hooks สำหรับจัดการ state และ side effects
import { useState, useEffect } from "react";

// กำหนดชนิดข้อมูลสำหรับข้อมูล system
interface SystemData {
  id: string;
  title: string;
  description: string | null;
  status: string;
  projectId: string;
}

// กำหนดชนิดข้อมูลสำหรับ props ที่ component รับเข้ามา
interface ButtonEditProps {
  systemId: string; // ID ของ system ที่ต้องการแก้ไข
  projectId: string; // ID ของ project ที่ system อยู่
  onSystemUpdated?: () => void; // ฟังก์ชันที่จะถูกเรียกเมื่อแก้ไขสำเร็จ
}

// Component หลักสำหรับปุ่มแก้ไข system
export default function ButtonEdit({
  systemId,
  projectId,
  onSystemUpdated,
}: ButtonEditProps) {
  // state สำหรับควบคุมการเปิด/ปิด dialog
  const [open, setOpen] = useState(false);

  // state สำหรับตรวจสอบว่า component ถูก mount บน client แล้วหรือไม่
  // (ป้องกันปัญหา hydration ใน Next.js)
  const [isMounted, setIsMounted] = useState(false);

  // state สำหรับเก็บข้อมูล system ที่ดึงมาจาก API
  const [systemData, setSystemData] = useState<SystemData | null>(null);

  // state สำหรับแสดงสถานะการโหลดข้อมูล
  const [loading, setLoading] = useState(false);

  // ใช้ useEffect เพื่อตั้งค่า isMounted เป็น true เมื่อ component ถูก mount
  // ทำงานครั้งเดียวเมื่อ component โหลดครั้งแรก (dependency array เป็น [])
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // ฟังก์ชันสำหรับดึงข้อมูล system จาก API
  const fetchSystemData = async () => {
    if (!systemId) return;

    setLoading(true);
    try {
      // เรียก API เพื่อดึงข้อมูล system
      const response = await fetch(`/api/systems/${systemId}`);

      if (response.ok) {
        const data = await response.json();
        setSystemData(data);
      } else {
        console.error("ไม่สามารถดึงข้อมูล system ได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงข้อมูล system:", error);
    } finally {
      setLoading(false);
    }
  };

  // เรียก fetchSystemData เมื่อ dialog เปิดและมี systemId
  useEffect(() => {
    if (open && systemId) {
      fetchSystemData();
    }
  }, [open, systemId]);

  // ฟังก์ชันสำหรับจัดการเมื่อแก้ไข system สำเร็จ
  const handleSystemUpdated = () => {
    // ปิด dialog
    setOpen(false);

    // เคลียร์ข้อมูล system เก่า
    setSystemData(null);

    // เรียกฟังก์ชันที่ส่งมาจาก parent component (ถ้ามี)
    if (onSystemUpdated) {
      onSystemUpdated();
    }
  };

  // ฟังก์ชันสำหรับจัดการเมื่อปิด dialog
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);

    // ถ้าปิด dialog ให้เคลียร์ข้อมูล
    if (!newOpen) {
      setSystemData(null);
    }
  };

  // ไม่แสดงผลถ้า component ยังไม่ถูก mount (ป้องกัน hydration error)
  if (!isMounted) {
    return null;
  }

  // ส่วนแสดงผลของ component
  return (
    // Dialog คือหน้าต่าง popup ที่เปิด/ปิดได้
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {/* DialogTrigger คือปุ่มที่จะเปิด dialog เมื่อคลิก */}
      <DialogTrigger asChild>
        {/* ปุ่มปากกาสำหรับแก้ไข */}
        <Pen
          className="
            text-blue-500             // สีปกติ
            hover:text-blue-700       // สีเมื่อ hover
            cursor-pointer            // เปลี่ยนเป็นรูปมือเมื่อ hover
            transition-colors         // เอฟเฟกต์การเปลี่ยนสี
          "
        />
      </DialogTrigger>

      {/* DialogContent คือเนื้อหาภายใน dialog */}
      <DialogContent className="sm:max-w-[500px]">
        {/* DialogHeader คือส่วนหัวของ dialog */}
        <DialogHeader>
          {/* DialogTitle คือชื่อของ dialog */}
          <DialogTitle>แก้ไขฟีเจอร์/ระบบ</DialogTitle>

          {/* DialogDescription คือคำอธิบายของ dialog */}
          <DialogDescription>
            แก้ไขข้อมูลฟีเจอร์หรือระบบในโปรเจคนี้
          </DialogDescription>
        </DialogHeader>

        {/* แสดงสถานะการโหลดข้อมูล */}
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <span className="ml-2 text-gray-600">กำลังโหลดข้อมูล...</span>
          </div>
        ) : (
          /* ฟอร์มสำหรับแก้ไข system */
          <FormCreateSystem
            projectId={projectId} // ส่ง projectId ไปยังฟอร์ม
            systemId={systemId} // ส่ง systemId ไปยังฟอร์ม
            onSuccess={handleSystemUpdated} // ส่งฟังก์ชัน callback
            isEdit={true} // บอกว่านี่คือโหมดแก้ไข
            initialData={
              systemData
                ? {
                    title: systemData.title,
                    description: systemData.description || "",
                    status: systemData.status,
                  }
                : undefined
            } // ส่งข้อมูลเก่าให้ฟอร์ม
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
