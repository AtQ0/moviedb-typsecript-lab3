import React, { useState } from "react";

interface RegisterFormProps {
    onRegister: (email: string, password: string, username: string) => void;
}

export default function RegisterForm({ onRegister }: RegisterFormProps) {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { username, email, password, confirmPassword } = formData;

        // Check if all fields are filled
        if (!username || !email || !password || !confirmPassword) {
            setError("All fields are required.");
            return;
        }

        // Check for valid email
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        // Check for username validity (letters, numbers, and underscores only)
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            setError("Username can only contain letters, numbers, and underscores.");
            return;
        }

        // Check for password validity (at least one letter and one number)
        if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
            setError("Password must contain at least one letter and one number.");
            return;
        }

        // Check for password length
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        // Clear error message if validation is successful
        setError("");

        // Pass email, password, and username to the parent component
        onRegister(email, password, username);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white text-blue-500 rounded-lg shadow-md p-6 w-96"
        >
            <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

            {/* Error message in a div */}
            {error && (
                <div className="text-red-500 mb-2 bg-red-100 border border-red-400 rounded p-2">
                    {error}
                </div>
            )}

            {/* Username Field */}
            <div className="mb-4">
                <label className="block text-blue-700 font-semibold mb-2">Username</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Email Field */}
            <div className="mb-4">
                <label className="block text-blue-700 font-semibold mb-2">Email</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Password Field */}
            <div className="mb-4">
                <label className="block text-blue-700 font-semibold mb-2">Password</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            {/* Confirm Password Field */}
            <div className="mb-4">
                <label className="block text-blue-700 font-semibold mb-2">Confirm Password</label>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white w-full py-2 rounded font-semibold hover:bg-blue-600"
            >
                Register
            </button>
        </form>
    );
}
