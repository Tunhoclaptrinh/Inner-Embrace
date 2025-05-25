// Header.jsx
import React from "react";
import "./Header.css";
import logo from "./assets/img/Logo.png";

const Header = (header) => {
  if (!header) return;
  return (
    <header>
      <div class="logo">
        <img src={logo} alt="Inner Embrace Logo" />
        {/* <!-- <h1>Inner Embrace</h1> --> */}
      </div>
      <nav>
        <ul>
          <li>
            <a href="/" class="nav--active">
              Home
            </a>
          </li>
          <li>
            <a href="/about">About</a>
          </li>
          <li>
            <a href="#">Programs</a>
          </li>
          <li>
            <a href="podcast">Podcasts</a>
          </li>
          <li>
            <a href="/blogs">Blogs</a>
          </li>
        </ul>
      </nav>
      <div class="nav-buttons">
        <a href="#" class="btn btn-outline">
          Explore Programs
        </a>
        <a href="#" class="btn btn-primary">
          Try AI Coaching
        </a>
      </div>
    </header>
  );
};

export default Header;
