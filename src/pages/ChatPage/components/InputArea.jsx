import React, { useState } from "react";
import { useChat } from "../../../context/ChatContext";
import SummaryPopup from "./SummaryPopup";
import "../../../assets/themify-icons-master/themify-icons-master/css/themify-icons.css";

const InputArea = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState("");
  const [finishingSession, setFinishingSession] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { finishSession, activeChatId, createSession, setError, activeMode } =
    useChat();

  const handleSendClick = () => {
    if (message.trim() !== "") {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  const handleFinishSession = async (summary) => {
    if (activeChatId) {
      setFinishingSession(true);

      try {
        const result = await finishSession(summary);

        if (result.success) {
          console.log("Session finished successfully");
        } else {
          console.error("Failed to finish session:", result.error);
          setError(`Failed to finish session: ${result.error}`);
        }
      } catch (error) {
        setError("An unexpected error occurred when finishing the session");
      } finally {
        setFinishingSession(false);
      }
    } else {
      setError("No active session to finish");
    }
  };

  const handleCreateNewChat = async () => {
    try {
      const result = await createSession(activeMode);
      if (result.success) {
        setMessage("");
      } else {
        // Error is already set by the createSession function
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  // Determine if we should show finish session button based on mode
  // Only map and imaginary modes use sessions
  const showFinishButton = activeMode === "map" || activeMode === "imaginary";

  // Determine placeholder text based on active mode
  const getPlaceholderText = () => {
    switch (activeMode) {
      case "map":
        return "Ask Inner Map...";
      case "imaginary":
        return "Ask your imaginary friend...";
      case "portal":
        return "Talk to Portal...";
      default:
        return "Ask anything...";
    }
  };

  return (
    <div className="input-area">
      {/* {showFinishButton && ( */}
      <button
        className="finish-btn"
        onClick={() => setIsPopupOpen(true)}
        disabled={!activeChatId || isLoading || finishingSession}
      >
        {finishingSession ? (
          "Finishing..."
        ) : (
          <>
            Finish <br />
            Session
          </>
        )}
      </button>
      {/* )} */}
      <div
        className={`input-area-input ${!showFinishButton ? "full-width" : ""}`}
      >
        <button
          className="plus-btn"
          onClick={handleCreateNewChat}
          disabled={isLoading}
        >
          +
        </button>
        <input
          type="text"
          className="chat-input"
          placeholder={getPlaceholderText()}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || finishingSession}
        />
        <button
          className="send-btn"
          onClick={handleSendClick}
          disabled={message.trim() === "" || isLoading || finishingSession}
        >
          <i className="ti ti-arrow-right"></i>
        </button>
      </div>
      <SummaryPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleFinishSession}
      />

      <style jsx>{`
        .full-width {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default InputArea;
