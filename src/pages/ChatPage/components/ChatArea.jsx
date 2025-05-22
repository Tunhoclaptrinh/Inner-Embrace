// export default ChatArea;
import React, { forwardRef, useEffect } from "react";
import LoadingIndicator from "./LoadingIndicator";
import { useChat } from "../../../context/ChatContext";

const ChatArea = forwardRef(({ messages, loading }, ref) => {
  // Get active mode from context
  const { activeMode } = useChat();

  // Ensure messages is always an array
  const safeMessages = Array.isArray(messages) ? messages : [];

  // Scroll to bottom when component mounts or messages change
  // useEffect(() => {
  //   if (ref?.current?.scrollTo) {
  //     requestAnimationFrame(() => {
  //       ref.current.scrollTo({
  //         top: ref.current.scrollHeight,
  //         behavior: "smooth",
  //       });
  //     });
  //   }
  // }, [safeMessages, ref]);

  // Get welcome message based on the active mode
  const getWelcomeMessage = () => {
    switch (activeMode) {
      case "map":
        return {
          title: "Welcome to Inner Map",
          description:
            "Explore your thoughts and feelings through conversation.",
        };
      case "imaginary":
        return {
          title: "Welcome to Imaginary Friend",
          description:
            "Talk with your imaginary companion about anything on your mind.",
        };
      case "portal":
        return {
          title: "Welcome to Portal",
          description: "Connect with insights from various perspectives.",
        };
      default:
        return {
          title: "Welcome",
          description: "Start a new conversation by typing a message below.",
        };
    }
  };

  if (safeMessages.length === 0 && !loading) {
    const welcome = getWelcomeMessage();

    return (
      <div className="chat-area empty-chat" ref={ref}>
        <div className={`empty-chat-message ${activeMode}`}>
          <h3>{welcome.title}</h3>
          <p>{welcome.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-area" ref={ref}>
      {safeMessages.map((message, index) => (
        <div
          key={message.id || index} // Use message.id if available, fallback to index
          className={`message-container ${message.type}`}
        >
          <div
            className={
              message.type === "sent"
                ? "message-sent p-content"
                : "message p-content"
            }
          >
            {message.text}
            {message.hasAvatar && (
              <div className={`avatar ${activeMode}-mode-indicator`}>
                {activeMode === "map"
                  ? "🧠"
                  : activeMode === "imaginary"
                  ? "👤"
                  : "🌐"}
              </div>
            )}
          </div>
          <div
            className={
              message.type === "sent"
                ? "message-time-right"
                : "message-time-left"
            }
          >
            {message.time || new Date().toLocaleTimeString()}
          </div>
        </div>
      ))}
      {loading && <LoadingIndicator />}
    </div>
  );
});

export default ChatArea;
