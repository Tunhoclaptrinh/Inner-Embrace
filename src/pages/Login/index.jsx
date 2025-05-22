import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../pages/ChatPage/assets/img/Logo_chat.png";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!email || !password) {
      setError("Email and password are required");
      setIsLoading(false);
      return;
    }

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate("/chat");
      } else {
        setError(result.error || "Authentication failed");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error("Login component error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    // Google login functionality would go here
    console.log("Google login clicked");
  };

  const handleFacebookLogin = () => {
    // Facebook login functionality would go here
    console.log("Facebook login clicked");
  };

  return (
    <div className="login-page">
      {/* Decorative elements */}
      <div className="yellow-circle"></div>
      <div className="orange-leaf"></div>
      <div className="purple-shape"></div>
      <div className="green-shape"></div>

      <div className="login-container">
        <div className="login-header">
          <img src={logo} alt="Inner Embrace Logo" className="logo" />
          <h1 className="main-title">Create an account to use Programs</h1>
          <p className="trial-text">
            You'll start on a <span className="highlight">free 14-day</span>{" "}
            trial of Team plan.
          </p>
          <p className="terms-text">
            By signing up for a Inner Embrace account, you agree to our{" "}
            <a href="/terms" className="link-text">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="link-text">
              Privacy Policy
            </a>
            , including how we collect, use, and share your personal data.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-message">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Your email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address..."
              className="input-field"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password..."
              className="input-field"
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="login-button" disabled={isLoading}>
            {isLoading ? "Processing..." : "Log in"}
          </button>

          <div className="divider">or</div>

          <button
            type="button"
            className="social-login-button google-button"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://icon2.cleanpng.com/20240216/fty/transparent-google-logo-flat-google-logo-with-blue-green-red-1710875585155.webp"
              alt="Google"
              className="social-icon"
            />
            Continue with Google
          </button>

          <button
            type="button"
            className="social-login-button facebook-button"
            onClick={handleFacebookLogin}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkLcBrDHgOj0B_qrNTygXlcjOPlRfGOBqZrw&s"
              alt="Facebook"
              className="social-icon"
            />
            Continue with Facebook
          </button>

          <div className="signup-option">
            Don't have an account?{" "}
            <a href="/signup" className="signup-link">
              Sign up
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
