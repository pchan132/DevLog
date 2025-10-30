// UI notes
import NoteEditor from "@/components/NoteEditor";

export default function createNotes() {
  return (
    <div className="bg-card text-card-foreground gap-6 rounded-xl py-6 px-4 shadow-sm">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">สร้างโน๊ต</h1>
        <a href="/projects" className="bg-gray-500 text-white p-2 rounded-lg">
          กลับ
        </a>
      </div>

      <div className="mt-6">
        <NoteEditor />
      </div>
    </div>
  );
}
