// frontend/src/components/LoginButton.jsx
import React from "react";

const BACKEND_URL = "http://localhost:3001";

function LoginButton() {
    const handleLogin = () => {
        window.location.href = `${BACKEND_URL}/auth/google`;
    };

    return (
        <button
            onClick={handleLogin}
            className="bg-red-500 text-white px-4 py-2 rounded"
        >
        Sign in with Google
        </button>
    );
}

export default LoginButton;
