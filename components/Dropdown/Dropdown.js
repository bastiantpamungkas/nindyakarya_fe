import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';

const CustomDropdown = ({
                            label = "Select an option", // Default label
                            icon,
                            items = [], // Dropdown items array
                            buttonStyle = {}, // Custom button styles
                            menuStyle = {}, // Custom menu styles
                            itemStyle = {}, // Custom item styles
                            onSelect, // Callback for selection
                            iconPosition = "left", // Icon position: left or right
                        }) => {
    const [selectedItem, setSelectedItem] = useState(label); // State for selected item
    const [buttonWidth, setButtonWidth] = useState("auto"); // To keep button and menu width consistent

    const handleSelect = (item) => {
        setSelectedItem(item); // Update selected item
        if (onSelect) {
            onSelect(item); // Trigger the callback function
        }
    };

    const buttonRef = React.useRef(null);

    React.useEffect(() => {
        // Dynamically set width based on button size
        if (buttonRef.current) {
            setButtonWidth(buttonRef.current.offsetWidth);
        }
    }, [selectedItem, label]);

    return (
        <Dropdown className="el-dropdown position-relative" align="start">
            <Dropdown.Toggle
                as={({ onClick }, ref) => (
                    <button
                        ref={(el) => {
                            buttonRef.current = el;
                            if (typeof ref === "function") {
                                ref(el); // Only call ref if it's a function
                            } else if (ref) {
                                // For object refs
                                ref.current = el;
                            }
                        }}
                        onClick={onClick}
                        className="btn btn-outline-light border rounded d-flex align-items-center gap-1 text-secondary"
                        style={{ width: "100%", ...buttonStyle }}
                    >
                        {iconPosition === "left" && icon}
                        <span className="ms-1 align-middle">{selectedItem}</span>
                        {iconPosition === "right" && icon}
                    </button>
                )}
            ></Dropdown.Toggle>
            <Dropdown.Menu
                className="el-dropdown-menu border-0"
                style={{
                    minWidth: buttonWidth, // Ensure menu matches button width
                    maxWidth: buttonWidth, // Prevent exceeding button width
                    boxShadow: "0px 0px 10px rgba(70, 52, 52, 0.15)",
                    ...menuStyle,
                }}
            >
                {items.map((item, index) => (
                    <Dropdown.Item
                        key={index}
                        className="font-size-14 font-weight-500 py-2"
                        style={itemStyle}
                        onClick={() => handleSelect(item)} // Update selected item on click
                    >
                        {item}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default CustomDropdown;
