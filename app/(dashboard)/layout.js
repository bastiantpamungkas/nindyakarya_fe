"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Layout/Sidebar/Sidebar.component";
import Navbar from "@/components/Layout/Navbar.component";
import useSessionUser from "@/stores/useSessionsAuthStore";
import {useSession} from "next-auth/react";
import {useQuery} from "react-query";
import {queryApi} from "@/utils/Libs/axios";

export default function Layout({ children, params }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const { setSessionUser, sessionUser, statusAuth } = useSessionUser(
        (state) => state
    );
    const { data: session, status } = useSession();

    useEffect(() => {
        if (session) setSessionUser(session, status);
    }, [session]);

    const handleSidebar = () => {
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
            <Sidebar sessionUser={sessionUser} showSidebar={showSidebar} params={params} />
            <div className="page-container">
                <Navbar queryDataNotification={[]} isLoadingNotification={[]} sessionUser={sessionUser} clickSidebar={handleSidebar} />
                <div className="page-content">{children}</div>
            </div>
        </main>
    );
}
