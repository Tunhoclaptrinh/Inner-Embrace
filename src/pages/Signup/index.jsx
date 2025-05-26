import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from "../../pages/ChatPage/assets/img/Logo_chat.png";
import "./Signup.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      return "Vui lòng điền đầy đủ thông tin";
    }

    if (password.length < 6) {
      return "Mật khẩu phải có ít nhất 6 ký tự";
    }

    if (password !== confirmPassword) {
      return "Mật khẩu xác nhận không khớp";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Email không hợp lệ";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const result = await signup(
        // firstName: formData.firstName,
        // lastName: formData.lastName,
        formData.email,
        formData.password
      );

      if (result.success) {
        navigate("/chat");
      } else {
        setError(result.error || "Đăng ký thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
      console.error("Signup component error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    // Google signup functionality would go here
    console.log("Google signup clicked");
  };

  const handleFacebookSignup = () => {
    // Facebook signup functionality would go here
    console.log("Facebook signup clicked");
  };

  return (
    <div className="signup-page">
      {/* Decorative elements */}
      <div className="yellow-circle"></div>
      <div className="orange-leaf"></div>
      <div className="purple-shape"></div>
      <div className="green-shape"></div>

      <div className="signup-container">
        <div className="signup-header">
          <img src={logo} alt="Inner Embrace Logo" className="logo" />
          <h1 className="main-title">Tạo tài khoản để sử dụng Chương trình</h1>
          <p className="trial-text">
            Bạn sẽ bắt đầu với{" "}
            <span className="highlight">14 ngày dùng thử miễn phí</span> gói
            Team.
          </p>
          <p className="terms-text">
            Bằng cách đăng ký tài khoản Inner Embrace, bạn đồng ý với{" "}
            <a href="/terms" className="link-text">
              Điều khoản Dịch vụ
            </a>{" "}
            và{" "}
            <a href="/privacy" className="link-text">
              Chính sách Bảo mật
            </a>
            , bao gồm cách chúng tôi thu thập, sử dụng và chia sẻ dữ liệu cá
            nhân của bạn.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="signup-form">
          {error && <div className="error-message">{error}</div>}

          <div className="name-row">
            <div className="form-group half-width">
              <label htmlFor="firstName">Họ và tên</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Nhập họ tên"
                className="input-field"
                required
                disabled={isLoading}
              />
            </div>

            <div className="form-group half-width">
              <label htmlFor="lastName">Tên</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Nhập tên"
                className="input-field"
                required
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Nhập email"
              className="input-field"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Nhập mật khẩu"
              className="input-field"
              required
              disabled={isLoading}
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Nhập lại mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Nhập lại mật khẩu"
              className="input-field"
              required
              disabled={isLoading}
            />
          </div>

          <button type="submit" className="signup-button" disabled={isLoading}>
            {isLoading ? "Đang xử lý..." : "Đăng ký"}
          </button>

          <div className="divider">hoặc</div>

          <button
            type="button"
            className="social-signup-button google-button"
            onClick={handleGoogleSignup}
            disabled={isLoading}
          >
            <img
              src="https://icon2.cleanpng.com/20240216/fty/transparent-google-logo-flat-google-logo-with-blue-green-red-1710875585155.webp"
              alt="Google"
              className="social-icon"
            />
            Tiếp tục với Google
          </button>

          <button
            type="button"
            className="social-signup-button facebook-button"
            onClick={handleFacebookSignup}
            disabled={isLoading}
          >
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkLcBrDHgOj0B_qrNTygXlcjOPlRfGOBqZrw&s"
              alt="Facebook"
              className="social-icon"
            />
            Tiếp tục với Facebook
          </button>

          <div className="login-option">
            Bạn đã có tài khoản?{" "}
            <a href="/login" className="login-link">
              Đăng nhập
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
