import React from "react";
import NavItem from "./NavItem";
import styles from "./Sidebar.module.css";

export default function NavSubItem({ items, pathname }) {
  const siteActive = items?.setActive ?? [];
  return (
    <>
      {/* <Accordion className={styles.accordition} defaultActiveKey="0" alwaysOpen={true}>
        <Accordion.Item eventKey="1">
          <Accordion.Header className="pe-4">
            <NavItem
              key={items.link}
              styles={styles}
              link={items.link}
              setActive={items?.setActive ?? []}
              title={items.title}
              icon={items.icon}
              dropdown={true}
              pathname={pathname}
            />
          </Accordion.Header>
          <Accordion.Body className={styles.accordionBody}>
            {items?.navItems?.map((item, index) => (
              <NavItem
                key={index}
                styles={styles}
                link={item.link}
                setActive={item?.setActive ?? []}
                title={item.title}
                roles={item?.roles ?? []}
                pathname={pathname}
                child={true}
              />
            ))}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
      <ul>
        <NavItem
          key={items.link}
          styles={styles}
          link={items.link}
          setActive={items?.setActive ?? []}
          title={items.title}
          icon={items.icon}
          pathname={pathname}
        />
      </ul>
    </>
  );
}
