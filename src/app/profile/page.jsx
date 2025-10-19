"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

export default function Profile() {
  const { data: session, status } = useSession();

  const router = useRouter();

  // เมื่อ ผู้ใช้ ไม่ได้เข้าสู่ระบบ
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/signin"); // ไปหน้า signin
    }
  }, [status, router]);

  // console.log("session: ", session);
  // console.log("status: ", status);

  return (
    <div className="flex h-screen justify-center items-center">
      <div className="bg-white p-6 rounded-2xl shadow-md">
        <p>
          Walcome, <b>{session?.user?.name}</b>
        </p>

        <p> Email: {session?.user?.email}</p>
        <p>Role: Role</p>

        <button onClick={() => signOut({ callbackUrl: "/" })}>Logout</button>
      </div>
    </div>
  );
}
