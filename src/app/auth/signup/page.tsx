"use client";

import AuthForm from "@/app/components/AuthForm";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const localApi = "http://localhost:3000/";
  const baseApi = "api/auth/signup";
  const router = useRouter();

  const handleSignUp = (data: any) => {
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

  return <AuthForm type="signUp" onSubmit={handleSignUp} />;
}
