import apiClient, { formatResponse } from "./apiClient";

const chatService = {
  // Get all sessions (prioritize REST endpoint)
  getSessions: async () => {
    try {
      const response = await apiClient.get("/rest/v1/session");
      const result = formatResponse(response);
      return result;
    } catch (error) {
      try {
        const fallbackResponse = await apiClient.get("/functions/v1/session");
        const result = formatResponse(fallbackResponse);
        return result;
      } catch (fallbackError) {
        return {
          success: false,
          error: error.response?.data?.error || "Failed to fetch sessions",
        };
      }
    }
  },

  // Create a new session with improved error handling and consistency
  createSession: async (mode = "map") => {
    try {
      const response = await apiClient.post("/functions/v1/session", { mode });

      // Handle both array and object responses consistently
      if (response && response.data) {
        let sessionData;

        if (Array.isArray(response.data)) {
          sessionData = response.data.length > 0 ? response.data[0] : null;
        } else {
          sessionData = response.data;
        }

        if (sessionData && sessionData.id) {
          return {
            success: true,
            data: sessionData,
          };
        } else {
          return {
            success: false,
            error: "Invalid session data format returned from server",
          };
        }
      }

      return {
        success: false,
        error: "No data returned from session creation",
      };
    } catch (error) {
      return {
        success: false,
        error: error?.response?.data?.error || "Failed to create session",
        details: error.response?.data || error.message,
      };
    }
  },

  // Complete a session
  completeSession: async (sessionId, summary) => {
    if (!sessionId) {
      return { success: false, error: "Session ID is required" };
    }

    try {
      const response = await apiClient.put(
        `/functions/v1/session/${sessionId}/complete`,
        { summary }
      );
      const result = formatResponse(response);
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to complete session",
        details: error.response?.data || error.message,
      };
    }
  },

  // Get messages for a specific session
  getSessionMessages: async (sessionId) => {
    if (!sessionId) {
      return { success: false, error: "Session ID is required" };
    }

    try {
      const response = await apiClient.get(
        `/rest/v1/message?sessionId=eq.${sessionId}`
      );
      const result = formatResponse(response);
      return result;
    } catch (error) {
      try {
        const fallbackResponse = await apiClient.get(
          `/functions/v1/session/${sessionId}/message`
        );
        const result = formatResponse(fallbackResponse);
        return result;
      } catch (fallbackError) {
        return {
          success: false,
          error: error.response?.data?.error || "Failed to fetch messages",
        };
      }
    }
  },

  // Send a message to the map companion
  sendMapMessage: async (sessionId, question) => {
    if (!sessionId || !question) {
      return { success: false, error: "Session ID and question are required" };
    }
    try {
      const response = await apiClient.post("/functions/v1/companion/map", {
        sessionId,
        question,
      });
      const result = formatResponse(response);
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to send message",
        details: error.response?.data || error.message,
      };
    }
  },

  // Send a message to the imaginary companion
  sendImaginaryMessage: async (sessionId, question) => {
    if (!sessionId || !question) {
      return { success: false, error: "Session ID and question are required" };
    }

    try {
      const response = await apiClient.post(
        "/functions/v1/companion/imaginary",
        {
          sessionId,
          question,
        }
      );
      const result = formatResponse(response);
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to send message",
        details: error.response?.data || error.message,
      };
    }
  },

  // Send a message to the portal companion
  sendPortalMessage: async (question, chatHistory = "") => {
    if (!question) {
      return { success: false, error: "Question is required" };
    }

    try {
      const response = await apiClient.post("/functions/v1/companion/portal", {
        question,
        chatHistory,
      });
      const result = formatResponse(response);
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to send message",
        details: error.response?.data || error.message,
      };
    }
  },

  // Get portal companion intro message
  getPortalIntro: async (sessionId) => {
    if (!sessionId) {
      return { success: false, error: "Session ID is required" };
    }

    try {
      const response = await apiClient.post(
        "/functions/v1/companion/portal/get-intro",
        { sessionId }
      );
      const result = formatResponse(response);
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to fetch portal intro",
        details: error.response?.data || error.message,
      };
    }
  },

  // Get portal companion data
  getPortalData: async () => {
    try {
      const response = await apiClient.get("/functions/v1/companion/portal");
      return formatResponse(response);
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.error || "Failed to fetch portal data",
        details: error.response?.data || error.message,
      };
    }
  },
};

export default chatService;
