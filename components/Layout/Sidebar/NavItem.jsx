import Link from "@/Link";
import React, { useRef } from "react";
import styles from "./Sidebar.module.css";
import { LiaAngleUpSolid } from "react-icons/lia";

function NavItem({
  icon,
  title,
  link,
  setActive,
  pathname,
  childrenMenu = false,
  child = false,
  handleClickItem,
}) {
  const navItemRef = useRef(null);
  return (
    <>
      <li
        key={link}
        className={`${styles.navItem} ${
          setActive.includes(pathname)
            ? styles.activeNavItem
            : ""
        }`}
        ref={navItemRef}
        {...(childrenMenu?.length > 0
          ? {
              onClick: (e) => {
                e.preventDefault();
                if (!navItemRef.current.lastElementChild.contains(e.target)) {
                  navItemRef.current.classList.toggle(styles.navItemOpen);
                  navItemRef.current.lastElementChild.classList.toggle(
                    styles.navSubItemOpen
                  );
                }
              },
            }
          : {})}
      >
        <Link
          href={childrenMenu?.length > 0 ? "#" : link}
          id="navLinkSidebar"
          {...(childrenMenu?.length > 0
            ? {
                onClick: (e) => {
                  e.preventDefault();
                },
              }
            : {
                onClick: () => {
                  if (typeof window !== "undefined" && window.innerWidth < 1440) {
                    handleClickItem();
                  }
                },
            })}
          className={`${styles.navLink ?? ""}`}
        >
          {!child && icon && (
            <div className={`${styles.icon ?? ""}`}>
              <i className={`${icon} ${styles.itemIcon ?? ""}`}></i>
            </div>
          )}
          <div className={`${styles.titleSidebar ?? ""}`}>{title}</div>
          {childrenMenu?.length > 0 && (
            <div className={`ms-auto ${styles.arrrow_sub_nav}`}>
              <LiaAngleUpSolid size={14} />
            </div>
          )}
        </Link>
        {childrenMenu.length > 0 && (
          <ul className={`${styles.navSubItem ?? ""}`}>
            {childrenMenu.map((item, index) => (
              <NavItem
                key={index}
                link={item.link}
                setActive={item?.setActive ?? []}
                title={item.title}
                icon={item.icon}
                pathname={pathname}
                childrenMenu={item?.navItems ?? []}
                child={true}
              />
            ))}
          </ul>
        )}
      </li>
    </>
  );
}

export default NavItem;
