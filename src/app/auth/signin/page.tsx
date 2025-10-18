"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/components/AuthForm";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [error, setError] = useState(""); // เก็บข้อความ error

  const handleSignIn = async (data: any) => {
    try {
      // ตรวจผู้ใช้กรอกครบไหม
      if (!data.email || !data.password) {
        setError("กรุณากรอกอีเมลและรหัสผ่านให้ครบ");
        return;
      }

      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      // ถ้ามี error จาก NextAuth (email หรือ password ผิด)
      if (result?.error) {
        setError("อีเมลหรือรหัสผ่านไม่ถูกต้อง");
        return;
      }

      // ถ้า login สำเร็จ
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setError("เกิดข้อผิดพลาด โปรดลองอีกครั้ง");
    }
  };

  return (
    <div>
      <AuthForm onSubmit={handleSignIn} type="signIn" errorMessage={error} />
    </div>
  );
}
