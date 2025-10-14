"use client";

import { useRouter } from "next/navigation";
import AuthForm from "@/app/components/AuthForm";
import { signIn } from "next-auth/react";
import { sign } from "crypto";

export default function SignIn() {
  const router = useRouter();

  const handleSignIn = async (data: any) => {
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        alert(result.error);
        return;
      } else {
        router.push("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <AuthForm onSubmit={handleSignIn} type="signIn" />
    </div>
  );
}
