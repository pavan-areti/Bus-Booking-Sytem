import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../resources/layout.css";
import { axiosInstance } from "../helpers/axiosInstance";
import { message } from "antd";
import axios from "axios";

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const logout = async () => {
    const res = await axios.post("/api/users/logout", {});
    message.success(res.data.message);
  };

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-line",
    },
    {
      name: "Buses",
      path: "/admin/buses",
      icon: "ri-bus-line",
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: "ri-user-line",
    },
    {
      name: "Bookings",
      path: "/bookings",
      icon: "ri-file-list-line",
    },
    {
      name: "Logout",
      path: "/logout",
      icon: "ri-logout-box-line",
    },
  ];

  const menuToRender = user?.isAdmin ? adminMenu : userMenu;

  const currentUrl = window.location.pathname;
  console.log(user);
  return (
    <div className="layout-parent">
      {!collapsed && (
        <div className="nav-bar">
          <div className="nav-bar-logo" onClick={() => navigate("/")}>
            LOGO
          </div>
          <form className="nav-bar-search">
            <input type="text" size="10" placeholder="From" className="search-input" />
            <input type="text" size="10" placeholder="To" className="search-input" />
            <input type="date" className="search-input" />
            <button className="search-button">
              <i class="ri-search-line"></i>
            </button>
          </form>
          <div className="nav-bar-items">
            {menuToRender.map((item, i) => (
              <div
                className={`menu-item ${
                  item.path === currentUrl && "active-menu-item"
                }`}
                onClick={() => {
                  if (item.path === "/logout") {
                    logout();
                    navigate("/login");
                  } else {
                    navigate(item.path);
                  }
                }}
                key={i}
              >
                <div className="menu-icon">
                  <i className={item.icon}></i>
                </div>
                <span className="menu-item-name">{item.name}</span>
              </div>
            ))}
          </div>
          <div className="nav-bar-profile">
            <img
              src={user ? user.profilePhoto : ""}
              height="40"
              width="40"
              style={{ borderRadius: "50%" }}
              alt="profile pic"
            />
            <p className="nav-bar-profile__name text-center text-white mt-3">
              {user?.isAdmin
                ? `${user ? user.firstName : ""} ${
                    user ? user.lastName : ""
                  } (Admin)`
                : `${user ? user.firstName : ""} ${user ? user.lastName : ""} `}
            </p>
          </div>
        </div>
      )}
      <div className="body">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
