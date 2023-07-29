import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../resources/layout.css";

function DefaultLayout({ children }) {
  const { user } = useSelector((state) => state.users);
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
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
      path: "/admin",
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
      path: "/admin/bookings",
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

  return (
    <div className="layout-parent">
      {!collapsed && (
        <div className="side-bar">
          <div className="side-bar-header m-5">
            <h1 className="logo pt-3 mt-3 text-center text-white">BB</h1>
            <h3 className="text-center text-white">
              {user?.isAdmin ? `${user?.name}(Admin)` : `${user?.name}`}
            </h3>
          </div>
          <div className="d-flex flex-column gap-2">
            {menuToRender.map((item, i) => (
              <div
                className={`menu-item ${
                  item.path === currentUrl && "active-menu-item"
                }`}
                onClick={() => {
                  if (item.path === "/logout") {
                    localStorage.removeItem("token");
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
        </div>
      )}
      <div className="body">
        <div className="header">
          {collapsed ? (
            <i
              class="ri-menu-line"
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            ></i>
          ) : (
            <i
              class="ri-close-fill"
              onClick={() => {
                setCollapsed(!collapsed);
              }}
            ></i>
          )}
        </div>
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
