import React from "react";
import "./HeaderLoggedIn.css";
import logo from "./assets/img/Logo.png";
import cartIcon from "./assets/icon/cart.png"; // bạn cần thêm icon này
import avatarIcon from "./assets/img/avatar.png"; // bạn cần thêm icon này

const Header = () => {
  return (
    <header className="logged-in">
      <div className="logo">
        <img src={logo} alt="Inner Embrace Logo" />
      </div>

      <nav>
        <ul>
          <li>
            <a href="/" className="nav--active">
              Trang chủ
            </a>
          </li>
          <li>
            <a href="/about">Khám phá khóa học</a>
          </li>
          <li>
            <a href="#">Khóa học của tôi</a>
          </li>
          <li>
            <a href="/podcast">Nâng cấp gói AI Chat</a>
          </li>
        </ul>
      </nav>

      <div className="nav-buttons">
        <a href="#" className="btn btn-primary">
          Chat với AI
        </a>
        <div className="user-buttons">
          <div className="icon-wrapper">
            <img src={cartIcon} alt="Cart" className="header-icon" />
          </div>
          <div className="icon-wrapper">
            <img src={avatarIcon} alt="User Avatar" className="header-icon" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
