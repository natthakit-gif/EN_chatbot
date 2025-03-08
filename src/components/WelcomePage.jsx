import React, { useState } from "react";

function WelcomePage({ onStartChat }) {
    const [prompt, setPrompt] = useState("");

    const handleStart = () => {
    // ส่ง prompt ที่ผู้ใช้กรอกไปยัง App เพื่อสลับไปหน้า Chat
    onStartChat(prompt);
    };

    return (
        <div className="flex h-screen bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white">
        <div className="w-64 bg-[#222222] p-6">
            <div className="mb-8">
            <h2 className="text-2xl font-bold">My Chatbot</h2>
            </div>
            <nav>
            <ul>
                <li className="mb-4">
                <a href="http://localhost:3001" className="hover:text-red-500">
                    Home
                </a>
                </li>
                <li className="mb-4">
                <a href="#" className="hover:text-red-500">
                    Profile
                </a>
                </li>
                <li className="mb-4">
                <a href="#" className="hover:text-red-500">
                    Settings
                </a>
                </li>
                <li className="mb-4">
                <a
                    href="http://localhost:3000"
                    className="hover:text-red-500 block mb-4"
                >
                    Logout
                </a>
                </li>
            </ul>
            </nav>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center min-h-screen bg-[linear-gradient(180deg,_#222222_0%,_#222222_70%,_#AC1B2D_100%)] border-8 border-black">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
                Welcome to <span className="text-red-500">RAGChatBot</span>
            </h1>
            <p className="text-gray-400 mb-6">
                The power of AI at your service - Tame the knowledge!
            </p>
            <div className="w-full max-w-xl">
                <div className="flex items-center bg-gray-800 rounded-full px-4 py-2 mb-6">
                    <input
                        type="text"
                        placeholder="Explain quantum computing in simple terms"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        onKeyDown={(e) => {
                        if (e.key === "Enter") handleStart();
                        }}
                        className="bg-transparent focus:outline-none text-white w-full"
                    />
                </div>
            </div>
            <button
                onClick={handleStart}
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded"
            >
            Start a new chat
            </button>
        </div>
        </div>
    );
}

export default WelcomePage;
