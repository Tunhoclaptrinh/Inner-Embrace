import axios from "axios";

const SUPABASE_URL = "https://qtrpxpbdjofmtsndwnrp.supabase.co";
const SUPABASE_API_KEY =
  // process.env.REACT_APP_SUPABASE_API_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0cnB4cGJkam9mbXRzbmR3bnJwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc1MzkzMjEsImV4cCI6MjA2MzExNTMyMX0.fvp2TP4gB28Jd7bRB6QJqjBwXk_PFUV4t_GnOfYK-RI";
// "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF0cnB4cGJkam9mbXRzbmR3bnJwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NzUzOTMyMSwiZXhwIjoyMDYzMTE1MzIxfQ.s_co2JYRwFZZz_GwoAsEhlkiFhpj1bxyaw6X5sug744";

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: SUPABASE_URL,
  headers: {
    "Content-Type": "application/json",
    apikey: SUPABASE_API_KEY,
  },
});

// Request interceptor for adding auth token when available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Enhanced response interceptor with better error handling
apiClient.interceptors.response.use(
  (response) => {
    if (response.status === 200 || response.status === 201) {
      return response;
    }
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("user");
      // Redirect to login (handled by components)
      window.dispatchEvent(new Event("auth:unauthorized"));
    }

    return Promise.reject(error);
  }
);

export const formatResponse = (response) => {
  if (!response) {
    return { success: false, error: "No response received" };
  }

  if (!response.data) {
    return { success: false, error: "Response has no data property" };
  }

  // Handle array responses
  if (Array.isArray(response.data)) {
    return { success: true, data: response.data };
  }

  // Handle object responses
  if (typeof response.data === "object" && response.data !== null) {
    return { success: true, data: response.data };
  }

  // For string, number, or boolean responses
  if (
    typeof response.data === "string" ||
    typeof response.data === "number" ||
    typeof response.data === "boolean"
  ) {
    return { success: true, data: response.data };
  }

  return { success: false, error: "Invalid response format" };
};

export default apiClient;
