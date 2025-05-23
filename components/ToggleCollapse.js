import * as React from "react";
const ToggleCollapse = (props) => (
    <svg
        width={34}
        height={24}
        viewBox="0 0 34 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M2 2H25"
            stroke="#A3B6CC"
            strokeWidth={2.5}
            strokeLinecap="round"
        />
        <path
            d="M2 12H32"
            stroke="#A3B6CC"
            strokeWidth={2.5}
            strokeLinecap="round"
        />
        <path
            d="M2 22H19"
            stroke="#A3B6CC"
            strokeWidth={2.5}
            strokeLinecap="round"
        />
    </svg>
);
export default ToggleCollapse;
