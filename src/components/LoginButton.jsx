// frontend/src/components/LoginButton.jsx
import React from "react";
import "./LoginButton.css"; // นำเข้าไฟล์ CSS ที่สร้างเอฟเฟกต์ gradient

const BACKEND_URL = "http://localhost:3001";

function LoginButton() {
    const handleLogin = () => {
        // Redirect ไปที่ backend /auth/google
        window.location.href = `${BACKEND_URL}/auth/google`;
    };

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen animate-gradientBG text-white">
            <h1 className="typewriter text-2xl font-bold mb-6">
                Please sign in with Google
            </h1>
        <button
            onClick={handleLogin}
            className="bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600 transition-colors"
        >
            Sign in with Google
        </button>
        </div>
    );
}

export default LoginButton;
