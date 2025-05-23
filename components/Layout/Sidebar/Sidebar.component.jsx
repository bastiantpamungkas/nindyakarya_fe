"use client";
import React from "react";
import styles from "./Sidebar.module.css";
import NavItem from "./NavItem";
import Image from "next/image";
import Link from "@/Link";
import sidebarData from "./Sidebar.constants";
import { usePathname } from "next/navigation";

export default function Sidebar({ handleClickItem, showSidebar, sessionUser }) {
  const pathname = usePathname();
  // const sessionUserRoles = sessionUser?.user?.roles?.map((item) => item?.name) || [];
  const sessionsUserPermissions = sessionUser?.user?.roles?.[0]?.permissions?.map((item) => item?.name) || [];

  const filteredSidebarData = sidebarData.filter(item => {
    // const roles = item?.roles || [];
    const permissions = item?.permissions || [];
    // const isRoleMatch = roles.some(role => sessionUserRoles.includes(role));
    const isPermissionMatch = permissions.some(permission => sessionsUserPermissions.includes(permission));
    // return isRoleMatch || isPermissionMatch;
    return isPermissionMatch;
  });

  return (
    <div
      className={`${styles.sidebar ?? ""} ${
        showSidebar ? styles.sidebarActive : ""
      }`}
      id="sidebar"
    >
      <Link href="/" className={`${styles.sidebarLogo}`}>
        <Image
          src="/logo.png"
          alt="Logo"
          width="68"
          height="68"
          className={`${styles.logoXl ?? ""}`}
          style={{ width: "68px", height: "68px" }}
        />
        <Image
          src="/logo.png"
          alt="Logo"
          width="68"
          height="68"
          className={`${styles.logoSmall ?? ""}`}
          style={{ width: "68px", height: "68px" }}
        />
      </Link>
      <ul className={`${styles.sidebarMenu ?? ""}`}>
        {!sessionUser?.roles
            ? Array.from({length: 4}, (_, index) => (
                <div key={index} className={styles.navLink}>
                  <div
                      className="skeleton-box bg-p-grey-12 my-2 rounded"
                      style={{height: "30px", width: "40px"}}
                  ></div>
                  <div
                      className="skeleton-box bg-p-grey-12 my-2 rounded me-4"
                      style={{height: "30px", width: "100%"}}
                  ></div>
                </div>
            ))
            : filteredSidebarData.map((item, index) => (
                <NavItem
                    key={index}
                    link={item.link}
                    setActive={item.setActive ?? []}
                    title={item.title}
                    icon={item.icon}
                    pathname={pathname}
                    childrenMenu={item.navItems ?? []}
                    handleClickItem={handleClickItem}
                />
            ))
        }
      </ul>
    </div>
  );
}
