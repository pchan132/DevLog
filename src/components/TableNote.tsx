"use client";
import { useState, useEffect } from "react";

interface Note {
  id: string;
  title: string;
  content: any;
  type: string;
}

export default function TableNote() {
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGetNotes() {
      try {
        const responte = await fetch(`
                /api/notes
                `);
        if (responte.ok) {
          const data = await responte.json(); // ข้อมูล notes
          setNote(data);
        }
      } catch (error) {
        console.error("Error fetching note:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchGetNotes();
  }, []);

  return (
    <div>
      {note.map((noteData) => (
        <div>{noteData}</div>
      ))}
    </div>
  );
}
