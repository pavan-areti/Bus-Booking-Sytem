import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../resources/layout.css";
import useStore from "../stores/store.js"
import { message } from "antd";
import axios from "axios";
import SearchAutosuggest from "./SearchAutoSuggest";

function DefaultLayout({ children }) {
  const { user } = useStore((state) => state.usersSlice);
  const { buses } = useStore((state) => state.busesSlice);
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [date, setDate] = useState("");

  const fromlist = buses.map((bus) => bus.from);
  const tolist = buses.map((bus) => bus.to);

  const navigate = useNavigate();

  const logout = async () => {
    const res = await axios.post("/api/users/logout", {});
    message.success(res.data.message);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const newSearchParams = new URLSearchParams();
    if (from) newSearchParams.set("from", from);
    if (to) newSearchParams.set("to", to);
    if (date) newSearchParams.set("date", date);
    navigate({ pathname: "/", search: newSearchParams.toString() });
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

  const handleFromSuggestionSelected = (event, { suggestionValue }) => {
    setFrom(suggestionValue);
  };

  const handleToSuggestionSelected = (event, { suggestionValue }) => {
    setTo(suggestionValue);
  };

  const handleDateChange = (value) => {
    setDate(value);
  };

  return (
    <div className="layout-parent">
      {
        <div className="nav-bar">
          <div className="nav-bar-logo" onClick={() => navigate("/")}>
            LOGO
          </div>
          <form className="nav-bar-search" onSubmit={handleSearch}>
            <SearchAutosuggest
              suggestions={fromlist}
              onSuggestionSelected={handleFromSuggestionSelected}
              placeholder="From"
              setValue={setFrom}
              value={from}
            />
            <SearchAutosuggest
              suggestions={tolist}
              onSuggestionSelected={handleToSuggestionSelected}
              placeholder="To"
              setValue={setTo}
              value={to}
            />
            <input
              type="date"
              onChange={(e) => {
                handleDateChange(e.target.value);
              }}
              className="search-input"
            />
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
      }
      <div className="body">
        <div className="content">{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;
