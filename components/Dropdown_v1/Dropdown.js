import React, { useState } from 'react';
import { useRouter } from "next/navigation";
import LoaderMain from "../LoaderMain";
import { Ellipsis, Trash2, Pencil } from "lucide-react";
import './Dropdown.css'; // Importing the CSS file for styling
import {ucFirst} from "@/utils/Libs/snippet";

const Dropdown = ({  
    id,
    menu,
    path,
    useDialog = false,
    onEdit = null,
    onDelete = null,
}) => {
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const showDropdown = () => setVisible(true);
  const hideDropdown = () => setVisible(false);

  const handleActionClick = (action) => {
    if (action === "delete") {
        if (onDelete) {
            onDelete(id);
        } else {
            setDeleteConfirmShow(true);
            // Additional delete handling logic here if needed
        }
    } else if (action === "edit") {
        if (onEdit) {
            onEdit();
        } else {
            if (useDialog) {
                // Implement dialog opening logic here if needed
            } else {
                LoaderMain.start();
                router.push(`${path}/${id}/edit`);
            }
        }
    }
  };

  return (
    <div
        className="dropdown_v1-container"
        onMouseEnter={showDropdown}
        onMouseLeave={hideDropdown}
    >
        <button className="border-0 radius-3" title="Action" style={{ backgroundColor: "transparent" }}>
            <Ellipsis style={{ color: "#4A5D75" }} />
        </button>
        {visible && 
            <div className="dropdown_v1" title="Select an option">
                <div className="card shadow" style={{ minHeight: "40px", minWidth: "120px" }}>
                    {menu.map((item, index) => (
                        <button 
                            key={index} 
                            className="btn font-weight-500 d-flex align-items-center radius-3 my-1" 
                            title={ucFirst(item)}
                            onClick={() => handleActionClick(item)}
                        >
                            {
                                (() => {
                                    if (item === "delete")
                                        return <Trash2 size={18} className="text-p-red" />;
                                    else if (item === "edit")
                                        return <Pencil size={18} className="text-p-green-6" />;
                                })()
                            }
                            <span className="ms-2 font-size-13 align-middle text-dark">
                                {ucFirst(item)}
                            </span>
                        </button>
                    ))}
                </div>
            </div>}
    </div>
  );
};

export default Dropdown;
