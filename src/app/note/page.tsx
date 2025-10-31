"use client";
import { useState } from "react";
import TiptapEditor from "@/components/TiptapEditor";

import Link from "next/link";

interface TypeNote {
  content: any; // tiptap ส่ง JSON object กลับมา ใช้ any ไปก่อนก็ได้
}

export default function Note() {
  // ✅ ตั้งค่าเริ่มต้นเป็น object
  const [note, setNote] = useState<TypeNote>({ content: {} });
  const [title, setTitle] = useState("");

  //   ฟังก์ชั่น เมื่อกด Submit
  async function onSubmitNote() {
    console.log(note);
    console.log("Title: ", title);
  }

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-xl font-bold mb-4">📝 Create a Note</h1>
        <Link href={`/projects`} className="flex p-3 border border-foreground">
          กลับ
        </Link>
      </div>

      <label htmlFor="title">Title</label>
      <input
        className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-b-transparent text-black"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <TiptapEditor
        content={note.content}
        onChange={(content) => setNote({ ...note, content })}
      />

      <button
        onClick={onSubmitNote}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Save
      </button>

      <pre className="bg-foreground p-2 mt-4 rounded text-sm text-black">
        {JSON.stringify(note.content, null, 2)}
      </pre>
    </div>
  );
}
