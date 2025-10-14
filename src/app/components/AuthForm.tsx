"use client";
import { useState } from "react";

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

    // ตรวจสอบเบื้องต้น
    if (!formData.email || !formData.password) {
      setError("กรุณากรอก Email และ Password");
      return;
    }

    // เช็คข้อมูล ชื่อ และ signUp
    if (!formData.name && type == "signUp") {
      setError("กรุณา กรอกชื่อ");
      return;
    }

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

      <button type="submit" className="border p-2 ">
        {type == "signIn" ? "เข้าสู่ระบบ" : "สมัครสมาชิก"}
      </button>
    </form>
  );
}
