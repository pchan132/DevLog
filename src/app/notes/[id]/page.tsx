"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import NoteEditor from "@/components/NoteEditor";

export default function EditNotePage() {
  const router = useRouter();
  const { id } = useParams();
  const [note, setNote] = useState<any>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const res = await fetch(`/api/notes/${id}`);
      const data = await res.json();
      setNote(data);
    };
    fetchNote();
  }, [id]);

  const handleSave = async () => {
    const res = await fetch(`/api/notes/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: note.content,
        type: note.type,
      }),
    });
    if (res.ok) router.push("/notes");
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-semibold">Edit Note</h1>

      <select
        value={note.type}
        onChange={(e) => setNote({ ...note, type: e.target.value })}
        className="border rounded p-2"
      >
        <option value="problem">Problem</option>
        <option value="solution">Solution</option>
        <option value="learning">Learning</option>
      </select>

      <NoteEditor
      // value={note.content}
      // onChange={(c) => setNote({ ...note, content: c })}
      />

      <button
        onClick={handleSave}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Update
      </button>
    </div>
  );
}
