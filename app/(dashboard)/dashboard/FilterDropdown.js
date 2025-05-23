"use client";

import { Dropdown } from "react-bootstrap";
import Select from "react-select";
import { Filter } from "lucide-react";

function FilterDropdown({
                            selectedShifts,
                            setSelectedShifts,
                            selectedCheckInStatus,
                            setSelectedCheckInStatus,
                            selectedCheckOutStatus,
                            setSelectedCheckOutStatus,
                            selectedCompany,
                            setSelectedCompany,
                            shiftOptions,
                            checkInOptions,
                            checkOutOptions,
                            companyOptions,
                        }) {
    // Fungsi untuk mengganti atau menghapus pilihan
    const toggleSelection = (option, selectedOptions, setSelectedOptions) => {
        // Jika opsi sudah dipilih, hapus dari state
        if (selectedOptions.some((item) => item.value === option.value)) {
            setSelectedOptions([]); // Kosongkan pilihan
        } else {
            // Jika belum dipilih, tambahkan sebagai pilihan
            setSelectedOptions([option]);
        }
    };

    return (
        <Dropdown className="el-dropdown" align="end">
            <Dropdown.Toggle
                as={({ onClick }, ref) => (
                    <div
                        onClick={(e) => {
                            e.preventDefault();
                            onClick(e);
                        }}
                        role="button"
                        className={`d-flex align-items-center gap-2 border border-2 px-4 py-2 radius-5`}
                    >
                        <div>
                            <Filter
                                size={20}
                                style={{
                                    color: "#646464",
                                }}
                            />
                        </div>
                        <div className="d-none d-lg-block nav-account">
                            <div className="font-size-14 font-weight-400">Filters</div>
                        </div>
                    </div>
                )}
            ></Dropdown.Toggle>
            <Dropdown.Menu
                className="el-dropdown-menu border-p-grey-13"
                style={{
                    minWidth: "230px",
                    right: "0",
                }}
            >
                <div className="card border-0 p-3">
                    {/* Bagian Shift */}
                    <div className="mb-3 d-none">
                        <div className="font-weight-400 font-size-14 text-p-grey-70">Shift</div>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {shiftOptions.map((shift) => (
                                <button
                                    key={shift.value}
                                    style={{
                                        border: "1px solid #CACACA",
                                    }}
                                    className={`font-weight-400 font-size-14 btn ${
                                        selectedShifts.some((item) => item.value === shift.value)
                                            ? "btn-primary"
                                            : "btn-outline-secondary"
                                    }`}
                                    onClick={() => toggleSelection(shift, selectedShifts, setSelectedShifts)}
                                >
                                    {shift.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Bagian Status Check In */}
                    <div className="mb-3">
                        <div className="font-weight-400 font-size-14 text-p-grey-70">Status Check In</div>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {checkInOptions.map((status) => (
                                <button
                                    key={status.value}
                                    style={{
                                        border: "1px solid #CACACA",
                                    }}
                                    className={`font-weight-400 font-size-14 btn ${
                                        selectedCheckInStatus.some((item) => item.value === status.value)
                                            ? "btn-primary"
                                            : "btn-outline-secondary"
                                    }`}
                                    onClick={() => toggleSelection(status, selectedCheckInStatus, setSelectedCheckInStatus)}
                                >
                                    {status.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Bagian Status Check Out */}
                    <div className="mb-3">
                        <div className="font-weight-400 font-size-14 text-p-grey-70">Status Check Out</div>
                        <div className="d-flex flex-wrap gap-2 mt-2">
                            {checkOutOptions.map((status) => (
                                <button
                                    key={status.value}
                                    style={{
                                        border: "1px solid #CACACA",
                                    }}
                                    className={`font-weight-400 font-size-14 btn ${
                                        selectedCheckOutStatus.some((item) => item.value === status.value)
                                            ? "btn-primary"
                                            : "btn-outline-secondary"
                                    }`}
                                    onClick={() =>
                                        toggleSelection(status, selectedCheckOutStatus, setSelectedCheckOutStatus)
                                    }
                                >
                                    {status.label}
                                </button>
                            ))}
                        </div>
                    </div>
                    {/* Bagian Perusahaan */}
                    <div className="mb-3">
                        <div className="font-weight-400 font-size-14 text-p-grey-70">Perusahaan</div>
                        <Select
                            options={companyOptions}
                            value={selectedCompany}
                            onChange={setSelectedCompany} // Hanya 1 pilihan pada dropdown ini
                            placeholder="Pilih Perusahaan"
                            isClearable
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    borderColor: "#CACACA",
                                    boxShadow: "none",
                                }),
                                option: (base, state) => ({
                                    ...base,
                                    backgroundColor: state.isSelected ? "#0d6efd" : "#fff",
                                    color: state.isSelected ? "#fff" : "#000",
                                    "&:hover": {
                                        backgroundColor: "#e9ecef",
                                        color: "#000",
                                    },
                                }),
                            }}
                        />
                    </div>
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
}

export default FilterDropdown;
