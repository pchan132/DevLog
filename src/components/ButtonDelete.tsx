import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";

interface ButtonDeleteProps {
  id: string;
  typeButton: string;
}
// typeButton : system | note

export default function ButtonDelete({ id, typeButton }: ButtonDeleteProps) {
  const router = useRouter();

  // ลบ System
  const handleDelete = async (id: string) => {
    if (!confirm("คุณแน่ใจหรือว่าต้องการลบฟังก์ชั่นนี้?")) return;

    try {
      // --------------------------------------
      // Delete system
      if (typeButton === "system") {
        const res = await fetch(`/api/systems/${id}`, {
          method: "DELETE",
        });

        if (res.ok) {
          alert("ลบฟังก์ชั่นเรียบร้อยแล้ว");
          router.refresh();
        } else {
          const error = await res.json();
          alert(`เกิดข้อผิดพลาด: ${error.error || "ไม่สามารถลบฟังก์ชั่นได้"}`);
        }
      }
      // --------------------------------------
    } catch (error) {
      alert(
        `เกิดข้อผิดพลาด: ${
          error instanceof Error ? error.message : "ไม่สามารถลบโปรเจคได้"
        }`
      );
    }
  };

  return (
    <>
      <Trash
        className="hover:text-red-800 cursor-pointer text-red-500"
        onClick={() => {
          handleDelete(id);
        }}
      />
    </>
  );
}
