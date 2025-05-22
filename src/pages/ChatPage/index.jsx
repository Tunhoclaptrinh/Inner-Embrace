import React, { useRef, useEffect } from "react";
import "./Chat.css";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import Header from "./components/Header";
import InputArea from "./components/InputArea";
import { useChat } from "../../context/ChatContext";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

function ChatPage() {
  const {
    messages,
    loading: chatLoading,
    error,
    sendMessage,
    setError,
    activeMode,
  } = useChat();
  const { isAuthenticated, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const chatAreaRef = useRef(null);

  // Redirect to login page if not authenticated
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, authLoading, navigate]);

  // Handle unauthorized event
  useEffect(() => {
    const handleUnauthorized = () => {
      navigate("/login");
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, [navigate]);

  const handleSendMessage = (message) => {
    if (message.trim() !== "") {
      sendMessage(message, activeMode);
    }
  };

  const dismissError = () => {
    setError(null); // Clear error manually
  };

  if (authLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="main-chat-container">
        <Sidebar />
        <div className="main-chat">
          <Header />
          <ChatArea
            messages={messages}
            loading={chatLoading}
            ref={chatAreaRef}
          />
          <InputArea
            onSendMessage={handleSendMessage}
            isLoading={chatLoading}
          />
          {error && (
            <div className="error-message">
              {error}
              <button onClick={dismissError}>Dismiss</button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ChatPage;
