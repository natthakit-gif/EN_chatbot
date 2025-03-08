// frontend/src/components/ChatPage.jsx
import React, { useState, useEffect } from "react";

const BACKEND_URL = "http://localhost:3001";

function ChatPage({ initialPrompt }) {
    const [messages, setMessages] = useState(() => {
        if (initialPrompt) {
        return [{ role: "user", content: initialPrompt }];
        }
        return [];
    });
    const [inputValue, setInputValue] = useState("");

    useEffect(() => {
        fetch(`${BACKEND_URL}/api/chat/history`, {
        credentials: "include"
        })
        .then((res) => {
            if (!res.ok) throw new Error("Not authenticated");
            return res.json();
        })
        .then((data) => {
            setMessages(data);
        })
        .catch((err) => {
            console.error("Error fetching chat history:", err);
        });
    }, []);

    const handleSend = async () => {
        if (!inputValue.trim()) return;
        const newMessage = { role: "user", content: inputValue.trim() };

        const response = await fetch(`${BACKEND_URL}/api/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(newMessage)
        });
        const savedMessage = await response.json();
        setMessages((prev) => [...prev, savedMessage]);
        setInputValue("");

        const assistantMessage = {
        role: "assistant",
        content: "This is a simulated response from the model..."
        };
        const response2 = await fetch(`${BACKEND_URL}/api/chat/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(assistantMessage)
        });
        const savedAssistant = await response2.json();
        setMessages((prev) => [...prev, savedAssistant]);
    };

    return (
        <div className="flex h-screen bg-[#222222] text-white">
        <div className="w-64 bg-[#222222] p-4">
            <h2 className="text-xl font-bold mb-4">Chat Menu</h2>
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
        <div className="flex-1 flex flex-col min-h-screen bg-[linear-gradient(180deg,_#222222_0%,_#222222_70%,_#AC1B2D_100%)] border-8 border-black">
            <div className="flex-1 overflow-y-auto p-4">
            {messages.map((msg, i) => (
                <div
                key={i}
                className={`mb-2 flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                }`}
                >
                <div
                    className={`p-2 rounded max-w-xs md:max-w-md ${
                    msg.role === "user" ? "bg-red-500" : "bg-gray-700"
                    }`}
                >
                    {msg.content}
                </div>
                </div>
            ))}
            </div>
            <div className="p-4 bg-gray-800">
            <div className="flex">
                <input
                type="text"
                placeholder="Type your message..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-gray-900 text-white p-2 rounded-l focus:outline-none"
                />
                <button
                onClick={handleSend}
                className="bg-red-500 px-4 py-2 rounded-r hover:bg-red-600"
                >
                Send
                </button>
            </div>
            </div>
        </div>
        </div>
    );
}

export default ChatPage;
