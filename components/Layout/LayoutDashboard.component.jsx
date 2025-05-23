"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar/Sidebar.component";
import Navbar from "./Navbar.component";

export default function LayoutDashboard({ children, params }) {
  const [showSidebar, setShowSidebar] = useState(false);

  const handleSidebar = () => {
    setShowSidebar((prev) => !prev);
  };

  const handleClickItem = () => {
    setShowSidebar((prev) => !prev);
  };

  const sideBarBody = () => {
    const main = document.querySelector("main");
    const sidebarToggle = document.querySelector(".sidebar-toggle");
    const sidebar = document.getElementById("sidebar");

    main.addEventListener("click", () => {
      if (typeof window !== "undefined" && window.innerWidth < 1440) {
        // Check if the mouse is not over sidebar or sidebar toggle
        if (!sidebarToggle.matches(":hover") && !sidebar.matches(":hover")) {
          setShowSidebar(false);
        }
      }
    });
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("Notification" in window && Notification.permission !== "denied") {
        Notification.requestPermission().then((permission) => {});
      }
    }
  }, []);

  useEffect(() => {
    sideBarBody();
  }, [showSidebar]);

  return (
      <main className={showSidebar ? "show-sidebar" : ""}>
        <Sidebar showSidebar={showSidebar} params={params} handleClickItem={handleClickItem}/>
        <div className="page-container">
          <Navbar clickSidebar={handleSidebar} />
          <div className="page-content">{children}</div>
        </div>
      </main>
  );
}
