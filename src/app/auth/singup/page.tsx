"use client";

import AuthForm from "@/app/components/AuthForm";

export default function page() {
  const localApi = "http://localhost:3000/";
  const baseApi = "api/auth/signup";

  const handleSignUp = (data: any) => {
    fetch(localApi + baseApi, {
      method: "POST", // สร้างข้อมูล
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  return <AuthForm type="signUp" onSubmit={handleSignUp} />;
}
