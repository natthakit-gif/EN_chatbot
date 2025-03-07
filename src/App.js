// frontend/src/App.jsx
import React, { useState, useEffect } from "react";
import LoginButton from "./components/LoginButton";
import WelcomePage from "./components/WelcomePage";
import ChatPage from "./components/ChatPage";

const BACKEND_URL = "http://localhost:3001";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [initialPrompt, setInitialPrompt] = useState("");
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    fetch(`${BACKEND_URL}/api/chat/history`, { credentials: "include" })
      .then((res) => {
        if (res.ok) {
          setIsAuthenticated(true);
        }
        setLoadingAuth(false);
      })
      .catch((err) => {
        console.error(err);
        setLoadingAuth(false);
      });
  }, []);

  if (loadingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-2xl mb-4">Please sign in with Google</h1>
        <LoginButton />
      </div>
    );
  }

  if (!initialPrompt) {
    return <WelcomePage onStartChat={(prompt) => setInitialPrompt(prompt)} />;
  }

  return <ChatPage initialPrompt={initialPrompt} />;
}

export default App;
