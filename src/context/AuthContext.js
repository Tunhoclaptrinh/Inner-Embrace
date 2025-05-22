// // context/AuthContext.js
// import React, { createContext, useState, useEffect, useContext } from "react";
// import authService from "../services/authService";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [authError, setAuthError] = useState(null);

//   useEffect(() => {
//     // Check if user is already logged in
//     const currentUser = authService.getCurrentUser();
//     setUser(currentUser);
//     setLoading(false);
//   }, []);

//   const login = async (email, password) => {
//     setLoading(true);
//     setAuthError(null);

//     const result = await authService.login(email, password);
//     setLoading(false);

//     if (result.success) {
//       setUser(result.data.user);
//     } else {
//       setAuthError(result.error || "Login failed");
//     }

//     return result;
//   };

//   const signup = async (email, password) => {
//     setLoading(true);
//     setAuthError(null);

//     const result = await authService.signUp(email, password);
//     setLoading(false);

//     if (result.success) {
//       // Auto login after successful signup
//       return await login(email, password);
//     } else {
//       setAuthError(result.error || "Signup failed");
//     }

//     return result;
//   };

//   const logout = () => {
//     authService.logout();
//     setUser(null);
//     setAuthError(null);
//     return { success: true };
//   };

//   const value = {
//     user,
//     loading,
//     authError,
//     login,
//     signup,
//     logout,
//     isAuthenticated: !!user,
//   };

//   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };

// export default AuthContext;
// context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from "react";
import authService from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  useEffect(() => {
    // Kiểm tra trạng thái đăng nhập khi component mount
    const checkAuth = async () => {
      try {
        const currentUser = await authService.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking auth status:", error);
        setAuthError("Failed to verify authentication status");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);

    const result = await authService.login(email, password);
    setLoading(false);

    if (result.success) {
      setUser(result.data.user);
    } else {
      setAuthError(result.error || "Login failed");
    }

    return result;
  };

  const signup = async (email, password) => {
    setLoading(true);
    setAuthError(null);

    const result = await authService.signUp(email, password);
    setLoading(false);

    if (result.success) {
      // Auto login sau khi signup thành công
      return await login(email, password);
    } else {
      setAuthError(result.error || "Signup failed");
    }

    return result;
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setAuthError(null);
    return { success: true };
  };

  const value = {
    user,
    loading,
    authError,
    login,
    signup,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthContext;
