"use client";
import React from "react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session, status } = useSession(); // ใช้ ข้อมูลใน Session
  const router = useRouter();
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // ไปหน้า signin
    }
  }, [status, router]);

  return <div>page</div>;
}
