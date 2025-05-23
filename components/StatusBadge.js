import React from "react";

const StatusBadge = ({ status, type }) => {
    // Define mapping for status values
    const statusMapping = {
        check_in: {
            1: { text: "Hadir Cepat", color: "#00920E", backgroundColor: "#CCFDD1" },
            2: { text: "Tepat Waktu", color: "#0051FF", backgroundColor: "#D6E4FF" },
            3: { text: "Telat Masuk", color: "#FF3B3B", backgroundColor: "#FFCECE" },
        },
        check_out: {
            1: { text: "Keluar Cepat", color: "#FF9500", backgroundColor: "#FFE3B3" },
            2: { text: "Tepat Waktu", color: "#0051FF", backgroundColor: "#D6E4FF" },
            3: { text: "Telat Keluar", color: "#FF3B3B", backgroundColor: "#FFCECE" },
        },
    };

    // Get the corresponding badge style and text
    const badge = statusMapping[type]?.[status] || { text: "-", color: "#000", backgroundColor: "#ffffff" };

    return (
        <div
            style={{
                padding: "5px 9px",
                borderRadius: "5px",
                textAlign: "center",
                maxWidth: "140px",
                color: badge.color,
                backgroundColor: badge.backgroundColor,
            }}
        >
            {badge.text}
        </div>
    );
};

export default StatusBadge;
