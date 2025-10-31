"use client";

import AuthForm from "@/components/AuthForm";
import { useRouter } from "next/navigation";

export default function SignUp() {
  const localApi =
    process.env.NEXT_PUBLIC_BASE_URL ||
    "http://localhost:3000/" ||
    "https://semianthropologic-innocuously-tamisha.ngrok-free.dev";
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
        router.push("/dashboard");
      }
    });
  };

  return <AuthForm type="signUp" onSubmit={handleSignUp} />;
}
