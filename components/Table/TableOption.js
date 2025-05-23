import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import {ChevronDown} from 'lucide-react';

export default function TableOption({
                                        children,
                                        placeholder,
                                        value,
                                        meta
                                    }) {
    return (
        <div className="d-flex align-items-center gap-3">
            <div className="font-weight-500 font-size-14">
                Rows Per Page
            </div>
            <Dropdown className="el-dropdown position-relative" align="start">
                <Dropdown.Toggle
                    as={({onClick}, ref) => (
                        <button
                            onClick={onClick}
                            className="btn btn-p-neutral-60 font-weight-600 font-size-12 w-100 text-p-neutral-100"
                        >
                            <span className="ms-2 align-middle">{value || placeholder}</span>
                            <ChevronDown className="ms-2"/>
                        </button>
                    )}
                ></Dropdown.Toggle>
                <Dropdown.Menu
                    className="el-dropdown-menu border-p-grey-13 border-0"
                    style={{
                        minWidth: "150px",
                        boxShadow: "0px 0px 10px rgba(70, 52, 52, 0.15)",
                        left: "42%",
                    }}
                    align="center"
                >
                    {children}
                </Dropdown.Menu>
            </Dropdown>
            <div className="font-weight-500 font-size-14">
                {
                    meta && `${meta.from ?? 0}-${meta.to ?? 0} of ${meta.total ?? 0} Entries`
                }
            </div>
        </div>
    );
}
