"use client";
import React from "react";
import { useRouter } from "next/navigation";
import LoaderMain from "../LoaderMain";
import { Dropdown } from "react-bootstrap";
import DropdownOverlay from "./DropdownOverlayTrigger";
import { Ellipsis, Trash2, Pencil } from "lucide-react";
import {ucFirst} from "@/utils/Libs/snippet";

export default function DropdownMenuAction({
                                               id,
                                               menu,
                                               path,
                                               useDialog = false,
                                               onEdit = null,
                                               onDelete = null,
                                           }) {
    const router = useRouter();

    const handleActionClick = (action) => {
        if (action === "delete") {
            if (onDelete) {
                onDelete(id);
            } else {
                setDeleteConfirmShow(true);
                console.log("Delete confirm dialog");
                // Additional delete handling logic here if needed
            }
        } else if (action === "edit") {
            if (onEdit) {
                onEdit();
            } else {
                if (useDialog) {
                    console.log("Open edit dialog");
                    // Implement dialog opening logic here if needed
                } else {
                    LoaderMain.start();
                    router.push(`${path}/${id}/edit`);
                }
            }
        }
    };

    return (
        <>
            <DropdownOverlay
                placement={"bottom-end"}
                className="el-dropdown-menu border-p-grey-13 border-0"
                classNameToggle="p-0 rounded-8"
                toggle={<Ellipsis style={{ color: "#4A5D75" }} />}
            >
                <div style={{ minHeight: "25px" }}>
                    {menu.map((item, index) => (
                        <Dropdown.Item
                            className="dropdown-item cursor-pointer py-2 radius-8"
                            key={index}
                            onClick={() => handleActionClick(item)}
                        >
                            <div className="font-weight-500 d-flex align-items-center">
                                {(() => {
                                    if (item === "delete")
                                        return <Trash2 size={18} className="text-p-red" />;
                                    else if (item === "edit")
                                        return <Pencil size={18} className="text-p-green-6" />;
                                })()}
                                <span className="ms-2 font-size-13 align-middle">
                                    {item === "delete" ? "Delete" : ucFirst(item)}
                                </span>
                            </div>
                        </Dropdown.Item>
                    ))}
                </div>
            </DropdownOverlay>
        </>
    );
}
