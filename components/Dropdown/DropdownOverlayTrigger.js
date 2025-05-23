import React, { useEffect, useRef, useState } from "react";
import Overlay from "react-bootstrap/Overlay";
import { Dropdown } from "react-bootstrap";

function DropdownOverlay({ classNameToggle = "", toggle, placement, children, ...props }) {
    const [show, setShow] = useState(false);
    const target = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (target.current && !target.current.contains(event.target)) {
                setShow(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="el-dropdown">
            <button
                className={`btn ${classNameToggle}`}
                ref={target}
                onClick={(e) => {
                    setShow(!show);
                    e.preventDefault();
                    e.stopPropagation();
                }}
            >
                {toggle}
            </button>
            <Overlay target={target.current} show={show} placement={placement}>
                {(data) => (
                    <Dropdown.Menu
                        {...props}
                        {...data}
                        show
                        style={{
                            minWidth: "150px",
                            boxShadow: "0px 0px 10px rgba(70, 52, 52, 0.15)",
                            ...data.style,
                        }}
                    >
                        {children}
                    </Dropdown.Menu>
                )}
            </Overlay>
        </div>
    );
}

export default DropdownOverlay;
