import React, { useState, useRef, useEffect, forwardRef } from "react";

// Mock contexts since we can't import them
const mockUseAuth = () => ({
  user: { email: "user@example.com" },
  logout: () => console.log("Logout"),
  isAuthenticated: true,
  loading: false,
});

const mockUseChat = () => ({
  activeMode: "map",
  setActiveMode: (mode) => console.log("Set mode:", mode),
  createSession: async (mode) => ({ success: true }),
  finishSession: async (summary) => ({ success: true }),
  messages: [],
  loading: false,
  error: null,
  setError: (error) => console.log("Error:", error),
  sendMessage: (message, mode) => console.log("Send:", message, mode),
  activeChatId: "session-1",
  setActiveChatId: (id) => console.log("Set chat ID:", id),
  sessions: [
    {
      id: "session-1",
      mode: "map",
      status: "active",
      summary: "Discussion about inner thoughts",
      created_at: new Date().toISOString(),
      title: "Inner Map Session",
    },
    {
      id: "session-2",
      mode: "imaginary",
      status: "finished",
      summary: "Creative conversation",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      title: "Imaginary Friend Chat",
    },
  ],
  fetchSessions: () => console.log("Fetching sessions"),
});

// LoadingIndicator Component
const LoadingIndicator = () => (
  <div className="flex items-center justify-center p-4">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
  </div>
);

// SummaryPopup Component
const SummaryPopup = ({ isOpen, onClose, onSubmit }) => {
  const [summary, setSummary] = useState("");

  const handleSubmit = () => {
    onSubmit(summary);
    setSummary("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Session Summary</h3>
        <textarea
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          placeholder="Enter a summary for this session..."
          className="w-full h-32 p-3 border rounded-md resize-none"
        />
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

// ChatArea Component
const ChatArea = forwardRef(({ messages, loading, activeMode }, ref) => {
  const safeMessages = Array.isArray(messages) ? messages : [];

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
          <h3 className="text-2xl font-bold mb-4">{welcome.title}</h3>
          <p className="text-gray-600">{welcome.description}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-area" ref={ref}>
      {safeMessages.map((message, index) => (
        <div
          key={message.id || index}
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

// Header Component
const Header = ({ activeMode, setActiveMode, createSession, user, logout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const modes = [
    { id: "map", name: "Inner Map" },
    { id: "imaginary", name: "Imaginary" },
    { id: "portal", name: "Portal" },
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    logout();
  };

  const handleModeChange = async (mode) => {
    if (mode !== activeMode) {
      setActiveMode(mode);
      try {
        await createSession(mode);
      } catch (error) {
        console.error("Error creating session with new mode:", error);
      }
    }
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userEmail = user?.email || "User";
  const userInitial = userEmail.charAt(0).toUpperCase();
  const currentModeName =
    modes.find((mode) => mode.id === activeMode)?.name || "Inner Map";

  return (
    <div className="header border-b border-gray-200 flex justify-between items-center bg-white px-7 py-6">
      <div className="mode-selector dropdown relative" ref={dropdownRef}>
        <div
          className="dropdown-button flex items-center cursor-pointer font-semibold gap-2 px-3 py-2 rounded-md transition-colors hover:bg-gray-50"
          onClick={toggleDropdown}
          title="Select companion mode"
        >
          <span>{currentModeName}</span>
          <span className="text-gray-500">▼</span>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-menu absolute top-full left-0 w-44 bg-white rounded-lg shadow-lg overflow-hidden z-10">
            {modes.map((mode) => (
              <div
                key={mode.id}
                className={`dropdown-item px-4 py-3 cursor-pointer flex justify-between items-center transition-colors hover:bg-gray-50 ${
                  activeMode === mode.id
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : ""
                }`}
                onClick={() => handleModeChange(mode.id)}
              >
                {mode.name}
                {activeMode === mode.id && <span>✓</span>}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="user-profile flex items-center gap-3">
        <div className="user-name text-sm font-medium">{userEmail}</div>
        <div
          className="profile-pic w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white font-medium cursor-pointer"
          title="Click to logout"
          onClick={handleLogout}
        >
          {userInitial}
        </div>
      </div>
    </div>
  );
};

// InputArea Component
const InputArea = ({
  onSendMessage,
  isLoading,
  activeMode,
  activeChatId,
  finishSession,
  createSession,
  setError,
}) => {
  const [message, setMessage] = useState("");
  const [finishingSession, setFinishingSession] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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
      }
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const showFinishButton = activeMode === "map" || activeMode === "imaginary";

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
    <div className="input-area flex p-4 bg-white border-t border-gray-200 items-center gap-3">
      <button
        className="finish-btn px-4 py-3 bg-red-300 text-white border-none rounded-lg cursor-pointer font-medium whitespace-nowrap text-sm leading-tight"
        onClick={() => setIsPopupOpen(true)}
        disabled={!activeChatId || isLoading || finishingSession}
      >
        {finishingSession ? "Finishing..." : "Finish\nSession"}
      </button>

      <div
        className={`input-area-input bg-gray-100 flex rounded-lg ${
          !showFinishButton ? "w-full" : "flex-1"
        }`}
      >
        <button
          className="plus-btn p-3 bg-transparent border-none cursor-pointer text-lg text-gray-600"
          onClick={handleCreateNewChat}
          disabled={isLoading}
        >
          +
        </button>
        <input
          type="text"
          className="chat-input flex-1 border-none bg-transparent outline-none text-sm text-gray-800 p-3"
          placeholder={getPlaceholderText()}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading || finishingSession}
        />
        <button
          className="send-btn bg-transparent border-none cursor-pointer text-blue-500 text-xl mr-4"
          onClick={handleSendClick}
          disabled={message.trim() === "" || isLoading || finishingSession}
        >
          →
        </button>
      </div>

      <SummaryPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSubmit={handleFinishSession}
      />
    </div>
  );
};

// Sidebar Component
const Sidebar = ({
  activeChatId,
  setActiveChatId,
  setActiveMode,
  sessions,
  createSession,
  loading,
  fetchSessions,
}) => {
  useEffect(() => {
    fetchSessions();
  }, [fetchSessions]);

  useEffect(() => {
    if (!activeChatId && sessions.length > 0) {
      const mostRecentSession = [...sessions].sort((a, b) => {
        const dateA = new Date(a.created_at || a.createdAt || 0);
        const dateB = new Date(b.created_at || b.createdAt || 0);
        return dateB - dateA;
      })[0];
      setActiveChatId(mostRecentSession.id);
      setActiveMode(mostRecentSession.mode);
    }
  }, [activeChatId, sessions, setActiveChatId, setActiveMode]);

  const handleChatClick = (sessionId) => {
    if (sessionId !== activeChatId) {
      setActiveChatId(sessionId);
      const selectedSession = sessions.find(
        (session) => session.id === sessionId
      );
      if (selectedSession) {
        setActiveMode(selectedSession.mode);
      }
    }
  };

  const handleCreateNewChat = async () => {
    try {
      await createSession("map");
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };

  const handleRefreshSessions = () => {
    fetchSessions();
  };

  const groupSessionsByDate = () => {
    const groups = {};

    if (!sessions || !sessions.length) return {};

    sessions.forEach((session) => {
      if (!session || (!session.created_at && !session.createdAt)) {
        return;
      }

      const date = new Date(session.created_at || session.createdAt);
      const today = new Date();
      const yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);

      let groupName;

      if (date.toDateString() === today.toDateString()) {
        groupName = "Today";
      } else if (date.toDateString() === yesterday.toDateString()) {
        groupName = "Yesterday";
      } else {
        groupName = date.toLocaleDateString("en-US", {
          month: "long",
          day: "numeric",
        });
      }

      if (!groups[groupName]) {
        groups[groupName] = [];
      }

      groups[groupName].push(session);
    });

    Object.keys(groups).forEach((key) => {
      groups[key].sort((a, b) => {
        const dateA = new Date(a.created_at || a.createdAt || 0);
        const dateB = new Date(b.created_at || b.createdAt || 0);
        return dateB - dateA;
      });
    });

    return groups;
  };

  const formatModeName = (mode) => {
    switch (mode) {
      case "map":
        return "Inner Map";
      case "imaginary":
        return "Imaginary";
      case "portal":
        return "Portal";
      default:
        return mode;
    }
  };

  const sessionGroups = groupSessionsByDate();
  const isEmptySidebar = Object.keys(sessionGroups).length === 0;

  return (
    <div className="sidebar w-90 h-screen bg-gray-50 border-r border-gray-200 flex flex-col overflow-y-auto">
      <div className="sidebar-header flex flex-col sticky bg-gray-50 top-0 left-0">
        <div className="sidebar-logo flex flex-col pt-5 pl-7">
          <div className="h-11 w-fit bg-red-600 text-white px-4 py-2 rounded font-bold">
            LOGO
          </div>
          <div className="sidebar-name flex justify-between mt-7 mr-7 w-76 pb-3">
            <span className="sidebar-title text-2xl text-red-600 font-medium">
              Inner Map
            </span>
            <div className="sidebar-icons flex gap-4">
              <span
                className="icon text-gray-600 cursor-pointer text-lg"
                onClick={handleCreateNewChat}
                title="Create new chat"
              >
                ✏️
              </span>
              <span
                className="icon text-gray-600 cursor-pointer text-lg"
                onClick={handleRefreshSessions}
                title="Refresh sessions"
              >
                🔄
              </span>
            </div>
          </div>
        </div>
      </div>

      {loading && (
        <div className="text-base font-semibold text-blue-900 ml-7">
          Loading sessions...
        </div>
      )}

      {!loading && isEmptySidebar && (
        <div className="text-base font-semibold text-blue-900 p-7">
          No chat sessions available.
          <button
            onClick={handleCreateNewChat}
            className="block mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Create your first chat
          </button>
        </div>
      )}

      {Object.entries(sessionGroups).map(([groupName, groupSessions]) => (
        <React.Fragment key={groupName}>
          <div className="timestamp text-sm mt-7 mb-3 ml-7 text-blue-900 font-semibold">
            {groupName}
          </div>
          <div className="chat-list px-7 flex flex-col gap-3">
            {groupSessions.map((session) => (
              <div
                key={session.id}
                className={`chat-item p-4 bg-white rounded-xl cursor-pointer transition-colors border border-gray-300 ${
                  session.status === "finished" ? "opacity-70" : ""
                } ${
                  activeChatId === session.id
                    ? "bg-blue-50 border-l-4 border-l-blue-500"
                    : ""
                } hover:bg-gray-50`}
                onClick={() => handleChatClick(session.id)}
              >
                <span
                  className={`chat-status inline-block px-3 py-1 rounded-full text-xs mb-3 ${
                    session.status === "active"
                      ? "bg-green-500 text-white"
                      : "bg-gray-400 text-white"
                  }`}
                >
                  {session.status === "active" ? "Chatting" : "Finished"}
                </span>
                <div className="chat-title-container flex flex-col">
                  <div className="chat-title font-medium text-gray-800 text-sm">
                    {session.summary ||
                      session.title ||
                      `Chat ${new Date(
                        session.createdAt || session.created_at
                      ).toLocaleTimeString()}`}
                  </div>
                  <div className="chat-mode text-xs text-blue-500 font-medium mt-1">
                    Mode: {formatModeName(session.mode)}
                  </div>
                  <div className="chat-timestamp text-xs text-gray-500 mt-1">
                    {new Date(
                      session.createdAt || session.created_at
                    ).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </React.Fragment>
      ))}

      <div className="upgrade-btn-container p-7 sticky bottom-0 right-0 left-0 bg-gray-50">
        <button className="upgrade-btn p-4 w-full bg-red-600 text-white border-none rounded-full cursor-pointer font-medium text-center">
          Upgrade Your Package
        </button>
      </div>
    </div>
  );
};

// Main Unified Chat Component
const UnifiedChatComponent = () => {
  // Mock hooks
  const chatContext = mockUseChat();
  const authContext = mockUseAuth();
  const chatAreaRef = useRef(null);

  // Local state for demonstration
  const [currentActiveMode, setCurrentActiveMode] = useState(
    chatContext.activeMode
  );
  const [currentActiveChatId, setCurrentActiveChatId] = useState(
    chatContext.activeChatId
  );
  const [currentMessages, setCurrentMessages] = useState(chatContext.messages);
  const [currentError, setCurrentError] = useState(chatContext.error);

  const handleSendMessage = (message) => {
    if (message.trim() !== "") {
      // Add message to current messages for demo
      const newMessage = {
        id: Date.now(),
        text: message,
        type: "sent",
        time: new Date().toLocaleTimeString(),
      };
      setCurrentMessages((prev) => [...prev, newMessage]);

      // Simulate AI response after a delay
      setTimeout(() => {
        const aiResponse = {
          id: Date.now() + 1,
          text: `This is a response from ${currentActiveMode} mode to: "${message}"`,
          type: "received",
          time: new Date().toLocaleTimeString(),
          hasAvatar: true,
        };
        setCurrentMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  const dismissError = () => {
    setCurrentError(null);
  };

  if (authContext.loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div className="main-chat-container flex h-screen">
      <Sidebar
        activeChatId={currentActiveChatId}
        setActiveChatId={setCurrentActiveChatId}
        setActiveMode={setCurrentActiveMode}
        sessions={chatContext.sessions}
        createSession={chatContext.createSession}
        loading={chatContext.loading}
        fetchSessions={chatContext.fetchSessions}
      />
      <div className="main-chat flex-1 flex flex-col h-screen">
        <Header
          activeMode={currentActiveMode}
          setActiveMode={setCurrentActiveMode}
          createSession={chatContext.createSession}
          user={authContext.user}
          logout={authContext.logout}
        />
        <div className="flex-1 overflow-y-auto p-7 bg-white flex flex-col gap-5">
          <ChatArea
            messages={currentMessages}
            loading={chatContext.loading}
            activeMode={currentActiveMode}
            ref={chatAreaRef}
          />
        </div>
        <InputArea
          onSendMessage={handleSendMessage}
          isLoading={chatContext.loading}
          activeMode={currentActiveMode}
          activeChatId={currentActiveChatId}
          finishSession={chatContext.finishSession}
          createSession={chatContext.createSession}
          setError={setCurrentError}
        />
        {currentError && (
          <div className="error-message bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex justify-between items-center">
            <span>{currentError}</span>
            <button
              onClick={dismissError}
              className="ml-4 text-red-700 hover:text-red-900"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedChatComponent;
