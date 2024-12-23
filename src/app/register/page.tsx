'use client';
import RegisterForm from "../../components/Register/RegisterForm";
import { useState } from "react";
import { useRouter } from 'next/navigation'; // Import useRouter hook for programmatic navigation

export default function Register() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState(""); // Add state for error message
    const router = useRouter(); // Initialize router to handle redirection

    const handleRegister = async (email: string, password: string, username: string) => {
        try {
            setIsSubmitting(true);
            setErrorMessage(""); // Clear previous error messages before making the request

            // Make POST request to the API
            const response = await fetch("/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password, username }), // Send username along with email and password
            });

            if (!response.ok) {
                throw new Error("Registration failed.");
            }

            const data = await response.json();
            console.log("Registration success:", data);

            // Redirect after successful registration
            router.push('/'); // Redirect to home page (or any other page)

        } catch (error) {
            console.error("Error registering:", error);
            setErrorMessage("Registration failed. Please try again."); // Set error message on failure
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="p-6 bg-blue-500 text-white">
                {/* Pass the handleRegister function as the onRegister prop */}
                <RegisterForm onRegister={handleRegister} />

                {isSubmitting && <p className="mt-4">Submitting...</p>}

                {/* Show the error message if registration failed */}
                {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            </div>
        </div>
    );
}
