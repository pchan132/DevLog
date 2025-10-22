import { NotebookPen } from "lucide-react";

export default function ButtonNewNote() {
  return (
    <div>
      <NotebookPen
        className=" text-yellow-300       // สีปกติ
            hover:text-yellow-700       // สีเมื่อ hover
            cursor-pointer            // เปลี่ยนเป็นรูปมือเมื่อ hover
            transition-colors         // เอฟเฟกต์การเปลี่ยนสี"
      />
    </div>
  );
}
