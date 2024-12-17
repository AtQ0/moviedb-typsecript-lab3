"use client";
import React from "react";
import LoginForm from "../components/Login/LoginForm";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="text-center rounded-lg shadow-md w-96">
        <LoginForm />
      </div>
    </div>
  );
}
