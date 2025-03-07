// frontend/src/components/WelcomePage.jsx
import React, { useState } from "react";

function WelcomePage({ onStartChat }) {
    const [prompt, setPrompt] = useState("");

    const handleStart = () => {
        onStartChat(prompt);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
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
    );
}

export default WelcomePage;
