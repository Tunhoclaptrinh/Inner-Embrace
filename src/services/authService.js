import apiClient from "./apiClient";

const authService = {
  // Login with email and password
  login: async (email, password) => {
    try {
      console.log("Attempting login for:", email);

      const response = await apiClient.post(
        "/auth/v1/token?grant_type=password",
        { email, password }
      );

      console.log("Login successful for:", email);
      localStorage.setItem("authToken", response.data.access_token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      return { success: true, data: response.data };
    } catch (error) {
      console.error("Login error:", error);

      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Login failed",
        status: error.response?.status,
        details: error.response?.data || error.message,
      };
    }
  },

  // Register new user
  signUp: async (email, password) => {
    try {
      console.log("Attempting signup for:", email);

      const response = await apiClient.post("/auth/v1/signup", {
        email,
        password,
      });

      console.log("Signup successful for:", email);
      return { success: true, data: response.data };
    } catch (error) {
      console.error("Signup error:", error);

      return {
        success: false,
        error:
          error.response?.data?.error ||
          error.response?.data?.message ||
          "Signup failed",
        status: error.response?.status,
        details: error.response?.data || error.message,
      };
    }
  },

  // Logout current user
  logout: () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    return { success: true };
  },

  // Check if user is logged in
  isAuthenticated: () => {
    return !!localStorage.getItem("authToken");
  },

  // Get current user
  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },

  // Get auth token
  getToken: () => {
    return localStorage.getItem("authToken");
  },
};

export default authService;
