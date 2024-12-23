'use client';
import React, { useState } from "react";

interface LoginFormProps {
    onLoginSuccess: (userId: string) => void; // UUID is a string
}

export default function LoginForm({ onLoginSuccess }: LoginFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setErrorMessage("");

        try {
            const response = await fetch(`/api/register?email=${email}&password=${password}`);
            const data = await response.json();

            if (response.ok) {
                console.log("Login successful!");
                console.log("User ID:", data.userId); // Log the UUID
                onLoginSuccess(data.userId); // Pass the UUID to parent component
            } else {
                setErrorMessage(data.message || "Invalid login credentials");
            }
        } catch (error) {
            console.error("Error during login:", error);
            setErrorMessage("An error occurred, please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-6">
            <h2 className="text-2xl mb-4">Login</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-2 mb-4 border"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 mb-4 border"
            />
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full p-2 bg-blue-500 text-white"
            >
                {isSubmitting ? "Logging in..." : "Login"}
            </button>
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            <p className="mt-4 text-center">
                Don’t have an account?{" "}
                <a href="/register" className="text-blue-700 hover:underline">
                    Register here!
                </a>
            </p>
        </form>
    );
}
