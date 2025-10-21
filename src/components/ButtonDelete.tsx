import { Trash } from "lucide-react";

interface ButtonDeleteProps {
  id: string;
}

export default function ButtonDelete({ id }: ButtonDeleteProps) {
  return (
    <>
      <Trash className="hover:text-red-800 cursor-pointer text-red-500" />
    </>
  );
}
