'use client';
import React, { useState } from "react";
import LoginForm from "../components/Login/LoginForm";
import { useRouter } from "next/navigation";

export default function Home() {
  const [userId, setUserId] = useState<string | null>(null); // Change to string
  const router = useRouter();

  const handleLoginSuccess = (id: string) => { // Change parameter to string
    setUserId(id);

    // Update to the correct dynamic route structure
    router.push(`/user/${id}`);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-[#8499B1]">
      {!userId ? (
        <div className="text-center rounded-lg shadow-md w-96">
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        </div>
      ) : (
        <div className="text-center">
          <p>Logged in with User ID: {userId}</p>
        </div>
      )}
    </div>
  );
}
