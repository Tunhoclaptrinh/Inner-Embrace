import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import chatService from "../services/chatService";
import { useAuth } from "./AuthContext";

const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeChatId, setActiveChatId] = useState(null);
  const [activeMode, setActiveMode] = useState("map"); // Default mode is map
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useAuth();

  // Clear error after 5 seconds or on user dismissal
  useEffect(() => {
    let timer;
    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 5000);
    }
    return () => clearTimeout(timer);
  }, [error]);

  // Handle unauthorized events
  useEffect(() => {
    const handleUnauthorized = () => {
      setSessions([]);
      setMessages([]);
      setActiveChatId(null);
      setError("Session expired. Please log in again.");
    };
    window.addEventListener("auth:unauthorized", handleUnauthorized);
    return () =>
      window.removeEventListener("auth:unauthorized", handleUnauthorized);
  }, []);

  // Fetch sessions when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchSessions();
    } else {
      setSessions([]);
      setMessages([]);
      setActiveChatId(null);
    }
  }, [isAuthenticated]);

  // Fetch messages or intro when active chat or mode changes
  useEffect(() => {
    if (activeChatId) {
      const session = sessions.find((s) => s.id === activeChatId);
      if (session && session.mode === "portal") {
        fetchPortalIntro(activeChatId);
      } else {
        fetchMessages(activeChatId);
      }
    } else {
      setMessages([]);
    }
  }, [activeChatId, sessions]);

  // Fetch all sessions
  const fetchSessions = useCallback(async () => {
    if (!isAuthenticated) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await chatService.getSessions();

      if (result.success && Array.isArray(result.data)) {
        const sortedSessions = [...result.data].sort((a, b) => {
          const dateA = new Date(a.created_at || a.createdAt || 0);
          const dateB = new Date(b.created_at || b.createdAt || 0);
          return dateB - dateA; // Sort from newest to oldest
        });

        setSessions(sortedSessions);

        // If no activeChatId, select the most recent session
        if (!activeChatId && sortedSessions.length > 0) {
          setActiveChatId(sortedSessions[0].id);
        }
      } else {
        setError(result.error || "Failed to fetch sessions");
      }
    } catch (err) {
      setError("Network error occurred while fetching sessions");
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, activeChatId]);

  // Fetch portal intro message
  const fetchPortalIntro = async (sessionId) => {
    if (!sessionId) {
      setError("Session ID is required for portal intro");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await chatService.getPortalIntro(sessionId);

      if (result.success && result.data && result.data.intro) {
        const introMessage = {
          id: `portal-intro-${Date.now()}`,
          text: result.data.intro,
          type: "received",
          time: new Date().toLocaleTimeString(),
          hasAvatar: true,
          timestamp: Date.now(),
        };
        setMessages([introMessage]);
      } else {
        setError(result.error || "Failed to fetch portal intro");
      }
    } catch (err) {
      setError("Network error occurred while fetching portal intro");
    } finally {
      setLoading(false);
    }
  };

  // Fetch messages for a specific session
  const fetchMessages = async (sessionId) => {
    if (!sessionId) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await chatService.getSessionMessages(sessionId);

      if (result.success && Array.isArray(result.data)) {
        const formattedMessages = result.data
          .filter(
            (message) =>
              message &&
              message.content &&
              (message.created_at || message.createdAt)
          )
          .map((message) => ({
            id: message.id,
            text: message.content,
            type: message.role === "user" ? "sent" : "received",
            time: new Date(
              message.created_at || message.createdAt
            ).toLocaleTimeString(),
            hasAvatar: message.role !== "user",
            timestamp: new Date(
              message.created_at || message.createdAt
            ).getTime(),
          }))
          .sort((a, b) => a.timestamp - b.timestamp);

        setMessages(formattedMessages);
      } else {
        setError(result.error || "Failed to fetch messages");
      }
    } catch (err) {
      setError("Network error occurred while fetching messages");
    } finally {
      setLoading(false);
    }
  };

  // Create new session with improved error handling and verification
  const createSession = async (mode = null) => {
    // Use provided mode or fall back to active mode
    const sessionMode = mode || activeMode;

    setLoading(true);
    setError(null);

    try {
      const result = await chatService.createSession(sessionMode);

      // Improved validation of the response
      if (result.success && result.data) {
        let sessionId;

        // Handle both object and array response formats
        if (Array.isArray(result.data) && result.data.length > 0) {
          sessionId = result.data[0].id;
        } else if (result.data.id) {
          sessionId = result.data.id;
        }

        if (sessionId) {
          // Create consistent session object
          const newSession = {
            id: sessionId,
            mode: sessionMode,
            status: "active",
            created_at: new Date().toISOString(),
            ...(Array.isArray(result.data) ? result.data[0] : result.data),
          };

          // Update sessions state with the new session
          setSessions((prev) => {
            // Check if session already exists to prevent duplicates
            const exists = prev.some((session) => session.id === sessionId);
            if (exists) {
              return prev;
            }
            return [newSession, ...prev];
          });

          setActiveChatId(sessionId);

          // For Portal mode, fetch intro message immediately
          if (sessionMode === "portal") {
            await fetchPortalIntro(sessionId);
          }

          // Verify session was actually created by refreshing the sessions list
          setTimeout(() => {
            fetchSessions();
          }, 500);

          return { success: true, sessionId };
        }
      }

      // If we got here, something went wrong
      const errorMsg = (result && result.error) || "Failed to create session";
      setError(errorMsg);

      // Attempt to refresh sessions anyway, in case it actually worked
      setTimeout(() => {
        fetchSessions();
      }, 1000);

      return { success: false, error: errorMsg };
    } catch (err) {
      const errorMsg = "Network error occurred while creating session";
      setError(errorMsg);

      // Attempt to refresh sessions anyway, in case it actually worked
      setTimeout(() => {
        fetchSessions();
      }, 1000);

      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  // Finish current session with API call
  const finishSession = async (summary) => {
    if (!activeChatId) {
      return { success: false, error: "No active session" };
    }

    setLoading(true);
    setError(null);

    try {
      // Call the API to complete the session
      const result = await chatService.completeSession(activeChatId, summary);

      if (!result.success) {
        setError(result.error || "Failed to complete session");
        return { success: false, error: result.error };
      }

      // Update session status in local state
      setSessions(
        sessions.map((session) =>
          session.id === activeChatId
            ? { ...session, status: "finished", summary }
            : session
        )
      );

      // Clear messages from current session
      setMessages([]);

      // Set active chat to null
      setActiveChatId(null);

      // If there are other active sessions, set the most recent one as active
      if (sessions.length > 1) {
        const otherActiveSessions = sessions.filter(
          (s) => s.id !== activeChatId && s.status === "active"
        );

        if (otherActiveSessions.length > 0) {
          // Sort by date and get the most recent one
          const mostRecent = [...otherActiveSessions].sort((a, b) => {
            const dateA = new Date(a.created_at || a.createdAt || 0);
            const dateB = new Date(b.created_at || b.createdAt || 0);
            return dateB - dateA;
          })[0];

          setActiveChatId(mostRecent.id);
          if (mostRecent.mode === "portal") {
            await fetchPortalIntro(mostRecent.id);
          } else {
            await fetchMessages(mostRecent.id);
          }
        }
      }

      return { success: true };
    } catch (err) {
      const errorMsg = "Error occurred while finishing session";
      setError(errorMsg);
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (message, mode = null) => {
    if (!message || message.trim() === "") {
      setError("Message cannot be empty");
      return { success: false, error: "Message cannot be empty" };
    }

    // Use provided mode or fall back to active mode
    const currentMode = mode || activeMode;

    setLoading(true);
    setError(null);

    let currentChatId = activeChatId;

    // Only create a new session for map and imaginary modes if no session exists
    if (
      !currentChatId &&
      (currentMode === "map" || currentMode === "imaginary")
    ) {
      try {
        const sessionResult = await createSession(currentMode);

        if (!sessionResult.success || !sessionResult.sessionId) {
          const errorMsg =
            sessionResult.error || "Failed to create a new session";
          setError(errorMsg);
          setLoading(false);
          return { success: false, error: errorMsg };
        }

        currentChatId = sessionResult.sessionId;
      } catch (err) {
        const errorMsg = "Network error occurred while creating session";
        setError(errorMsg);
        setLoading(false);
        return { success: false, error: errorMsg };
      }
    }

    const tempMessage = {
      id: `temp-${Date.now()}`,
      text: message,
      type: "sent",
      time: new Date().toLocaleTimeString(),
      hasAvatar: false,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, tempMessage]);

    try {
      let result;

      if (currentMode === "map") {
        result = await chatService.sendMapMessage(currentChatId, message);
      } else if (currentMode === "imaginary") {
        result = await chatService.sendImaginaryMessage(currentChatId, message);
      } else if (currentMode === "portal") {
        const chatHistory = messages
          .map(
            (msg) =>
              `${msg.type === "sent" ? "User" : "Assistant"}: ${msg.text}`
          )
          .join("\n");
        result = await chatService.sendPortalMessage(message, chatHistory);
      } else {
        // Fallback to map mode if something goes wrong
        result = await chatService.sendMapMessage(currentChatId, message);
      }

      if (result && result.success) {
        // For map and imaginary modes that use sessions, reload messages
        if (currentMode === "map" || currentMode === "imaginary") {
          await fetchMessages(currentChatId);
        } else if (currentMode === "portal") {
          // For portal mode, we need to handle the response differently
          if (result.data && result.data.response) {
            // Add assistant response manually
            const portalResponse = {
              id: `portal-${Date.now()}`,
              text: result.data.response,
              type: "received",
              time: new Date().toLocaleTimeString(),
              hasAvatar: true,
              timestamp: Date.now() + 1, // +1 to ensure it sorts after the user message
            };

            setMessages((prev) => {
              // Replace temporary message with actual one and add response
              const updatedMessages = prev.filter(
                (msg) => msg.id !== tempMessage.id
              );

              return [
                ...updatedMessages,
                {
                  ...tempMessage,
                  id: `user-${Date.now()}`,
                },
                portalResponse,
              ];
            });
          }
        }
        return { success: true };
      } else {
        const errorMsg = (result && result.error) || "Failed to send message";
        setError(errorMsg);
        setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
        return { success: false, error: errorMsg };
      }
    } catch (err) {
      const errorMsg = "Network error occurred while sending message";
      setError(errorMsg);
      setMessages((prev) => prev.filter((msg) => msg.id !== tempMessage.id));
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    sessions,
    messages,
    loading,
    error,
    activeChatId,
    activeMode,
    setActiveChatId,
    setActiveMode,
    sendMessage,
    createSession,
    fetchSessions,
    fetchMessages,
    finishSession,
    setError,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export default ChatContext;
