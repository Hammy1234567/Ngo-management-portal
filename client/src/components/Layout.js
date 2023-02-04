import React from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import "../layout.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Badge } from "antd";

function Layout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.user);
  const Navigate = useNavigate();
  const location = useLocation();
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-4-fill",
    },
    // {
    //   name: "NGOs",
    //   path: "NGOs",
    //   icon: "ri-government-fill",
    // },
    {
      name: "Apply for Ngo's",
      path: "/apply-ngo",
      icon: "ri-profile-fill",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-fill",
    },
  ];

  const ngoMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-4-fill",
    },
    {
      name: "NGOs",
      path: "NGOs",
      icon: "ri-government-fill",
    },

    {
      name: "Profile",
      path: `/ngo/profile/${user?._id}`,
      icon: "ri-user-fill",
    },
  ];

  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-4-fill",
    },
    {
      name: "NGOs",
      path: "/admin/ngoslist",
      icon: "ri-government-fill",
    },
    {
      name: "users",
      path: "/admin/userslist",
      icon: "ri-user-line",
    },
    // {
    //   name: "Profile",
    //   path: "/profile",
    //   icon: "ri-user-fill",
    // },
  ];

  // const menuToBeRendered = user?.isAdmin ? adminMenu : userMenu;

  const menuToBeRendered = user?.isAdmin
    ? adminMenu
    : user?.isNgo
    ? ngoMenu
    : userMenu;

  const role = user?.isAdmin ? "Admin" : user?.isNgo ? "NGO" : "User";
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="logo">NGO PORTAL</h1>
            <h1 className="role">ROLE : {role}</h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && <Link to={menu.path}>{menu.name}</Link>}
                </div>
              );
            })}
            <div
              className={`d-flex menu-item`}
              onClick={() => {
                localStorage.clear();
                Navigate("/login");
              }}
            >
              <i className="ri-logout-box-line"></i>
              {!collapsed && <Link to="/login">Logout</Link>}
            </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {!collapsed ? (
              <i
                className="ri-close-fill header-action-icon"
                onClick={() => setCollapsed(true)}
              ></i>
            ) : (
              <i
                className="ri-menu-fill header-action-icon"
                onClick={() => setCollapsed(false)}
              ></i>
            )}
            <div className="a-flex align-items-center px-4">
              <Badge
                count={user?.unseenNotifications.length}
                onClick={() => Navigate("/notifications")}
              >
                <i className="ri-notification-line header-action-icon px-3"></i>
              </Badge>

              <Link className="anchor mx-2" to="/profile">
                {user?.name}
              </Link>
            </div>
          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
