"use client";

import AuthForm from "@/app/components/AuthForm";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
  const localApi = "http://localhost:3000/";
  const baseApi = "api/auth/signup";
  const router = useRouter();
  const [error, setError] = useState(""); // เก็บข้อความ error

  const handleSignUp = (data: any) => {
    // ตรวจสอบข้อมูล
    if (!data.name || !data.email || !data.password) {
      setError("กรุณากรอกอีเมลและรหัสผ่านให้ครบ");
      return;
    }

    fetch(localApi + baseApi, {
      method: "POST", // สร้างข้อมูล
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        router.push("/profile");
      }
    });
  };

  return (
    <AuthForm type="signUp" onSubmit={handleSignUp} errorMessage={error} />
  );
}
