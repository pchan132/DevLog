"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

// กำหนด ว่าเป็น sinIn | signUp
type AuthType = "signIn" | "signUp";

interface AuthFormProps {
  type: AuthType;
  onSubmit: (data: FormDataType) => void;
}

interface FormDataType {
  name: string;
  email: string;
  password: string;
}

export default function AuthForm({ type, onSubmit }: AuthFormProps) {
  const [formData, setFormData] = useState<FormDataType>({
    name: "", // ใช้เมื่อ Sign Up
    email: "",
    password: "",
  });

  const router = useRouter();

  // เก็บ Error เมื่อ ข้อมูลขาด
  const [error, setError] = useState("");

  // เมื่อกรอกข้อมูลผู้ใช้ ในฟอร์ม
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // เมื่อกด submit
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // ไม่ให้ reload หน้า  เพจ

    setError("");
    onSubmit(formData); // ส่ง Data ออกไปให้ ผ่าน onSubmit
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded shadow"
    >
      <h2 className="text-2xl text-center mb-4 font-semibold">
        {type == "signIn" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
      </h2>
      {/* ถ้า เป็น signUp ให้มี กรอกชื่อ */}
      {type == "signUp" && (
        <div className="mb-4">
          <label className="block mb-1">ชื่อผู้ใช้</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
      )}

      <div className="mb-4">
        <label className="block mb-1">อีเมล</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">รหัสผ่าน</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="border p-2 w-full"
        />
      </div>

      <button type="submit" className="border p-2 cursor-pointer">
        {type == "signIn" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
      </button>
      {error && <p className="text-red-500">{error}</p>}

      {/* เข้าสู่ระบบด้วย Google */}
      <div className="flex justify-center mt-4">
        <button
          className="flex cursor-pointer"
          onClick={() => signIn("google", { callbackUrl: "/profile" })}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            fill={"currentColor"}
            viewBox="0 0 24 24"
          >
            {/* Boxicons v3.0 https://boxicons.com | License  https://docs.boxicons.com/free */}
            <path d="M20.283 10.356h-8.327v3.451h4.792c-.446 2.193-2.313 3.453-4.792 3.453a5.27 5.27 0 0 1-5.279-5.28 5.27 5.27 0 0 1 5.279-5.279c1.259 0 2.397.447 3.29 1.178l2.6-2.599c-1.584-1.381-3.615-2.233-5.89-2.233a8.91 8.91 0 0 0-8.934 8.934 8.907 8.907 0 0 0 8.934 8.934c4.467 0 8.529-3.249 8.529-8.934 0-.528-.081-1.097-.202-1.625"></path>
          </svg>
          {type == "signIn"
            ? "เข้าสู่ระบบด้วย Google"
            : "สมัครสมาชิกด้วย Google"}
        </button>
      </div>
    </form>
  );
}
