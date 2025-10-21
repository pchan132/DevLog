import { Pen, Eye } from "lucide-react";

interface ButtonEditProps {
  id: string;
}
export default function ButtonEdit({ id }: ButtonEditProps) {
  return (
    <>
      <Pen className="hover:text-green-800 cursor-pointer text-green-500" />
    </>
  );
}
