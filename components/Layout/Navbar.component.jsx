"use client";
import React, { useState } from "react";
import styles from "./Navbar.module.css";
import Image from "next/image";
import { Dropdown } from "react-bootstrap";
import { ucfirst, } from "@/utils/Helpers/Helper";
import ToggleCollapse from "@/components/ToggleCollapse";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import SkeletonItem from "@/components/Skeleton/SkeletonItem";
import PasswordModal from "./PasswordModal";

export default function Navbar({ clickSidebar, sessionUser, isLoadingNotification, queryDataNotification }) {
    const route = useRouter()
    const [modalConfig, setModalConfig] = useState({ show: false, mode: "create", initialData: {} });
    const handleLogout = async () => {
        localStorage.clear();
        await signOut();

        route.refresh();
    };

    const openModal = (mode, data = {}) => {
        setModalConfig({ show: true, mode, initialData: data });
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, show: false });
    };

    return (
        <div className={`header ${styles.navbar ?? ""}`} id="hide_on_scroll">
            <div className="header-container">
                <ul className="nav-left">
                    <li className={`${styles.navItem}`}>
                        <a
                            onClick={() => clickSidebar()}
                            className={`sidebar-toggle ${styles.navLink}`}
                            role="button"
                        >
                            <ToggleCollapse />
                        </a>
                    </li>
                    <li>
                        <div>
                            <div role="button" className="btn d-block d-none">
                                <Search />
                            </div>
                        </div>
                    </li>
                </ul>
                <ul className="nav-right px-0 px-md-4">
                    <li className={`${styles.navItem}`}>
                        <Dropdown className="el-dropdown" align="end">
                            <Dropdown.Toggle
                                as={({ onClick }, ref) => (
                                    <div
                                        onClick={(e) => {
                                            e.preventDefault();
                                            onClick(e);
                                        }}
                                        role="button"
                                        className={`d-flex align-items-center gap-3 ${styles.navLink}`}
                                    >
                                        {sessionUser?.user ?? null ? (
                                            <>
                                                <div className="p-1 border border-2 rounded-circle">
                                                    <Image
                                                        src={`/placeholder.png`}
                                                        className="object-cover-center rounded-circle"
                                                        width="38"
                                                        height="38"
                                                        alt="Foto Profile"
                                                        style={{ height: "34px", width: "34px" }}
                                                    />
                                                </div>
                                                <div className="d-none d-lg-block nav-account">
                                                    <div className="font-size-13 font-weight-700 text-p-blue-21">
                                                        {
                                                            sessionUser?.user?.name ?? ""
                                                        }
                                                    </div>
                                                    <div className="font-weight-600 font-size-11 text-p-grey-49">
                                                        {ucfirst(
                                                            sessionUser?.user?.roles[0]?.name ?? ""
                                                        ) ?? ""}
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div>
                                                    <SkeletonItem
                                                        className="rounded-circle bg-p-grey-8"
                                                        style={{ height: "40px", width: "40px" }}
                                                    />
                                                </div>
                                                <div>
                                                    <div>
                                                        <SkeletonItem
                                                            className=" radius-10 bg-p-grey-8"
                                                            style={{ height: "15px", minWidth: "150px" }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <SkeletonItem
                                                            className="radius-10 bg-p-grey-8"
                                                            style={{ height: "9px", minWidth: "90px" }}
                                                        />
                                                    </div>
                                                </div>
                                            </>
                                        )}
                                    </div>
                                )}
                            ></Dropdown.Toggle>
                            <Dropdown.Menu
                                className="el-dropdown-menu border-p-grey-13"
                                style={{ minWidth: "230px" }}
                            >
                                <div className="card border-0">
                                    <div className="border-bottom-p-grey-13 px-3 pt-1 pb-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div>
                                                <Image
                                                    src="/placeholder.png"
                                                    className="object-cover-center rounded-circle"
                                                    width="29"
                                                    height="29"
                                                    alt="Foto Profile"
                                                    style={{ height: "29px", width: "29px" }}
                                                />
                                            </div>
                                            <div>
                                                <div className="font-weight-600 font-size-13 text-p-black-4">
                                                    {
                                                        sessionUser?.user?.name ?? ""
                                                    }
                                                </div>
                                                <div className="font-size-10 font-weight-400 text-p-grey-27">
                                                    {
                                                        sessionUser?.user?.email ?? ""
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="border-top-p-grey-13 py-2">
                                        <div className="vstack gap-2">
                                            <div className="px-3">
                                                <a
                                                    className="text-p-blue-21 font-weight-400 font-size-13 text-decoration-none"
                                                    style={{ cursor: "pointer" }}
                                                    onClick={() => openModal("create")}
                                                >
                                                    <i
                                                        className="ip ip-lock bg-p-blue-21 align-middle"
                                                        style={{ height: "19px" }}
                                                    ></i>
                                                    <span className="ps-1">Ubah Password</span>
                                                </a>
                                                <PasswordModal
                                                    show={modalConfig.show}
                                                    onHide={closeModal}
                                                    handleLogout={handleLogout}
                                                    mode={modalConfig.mode}
                                                    initialData={modalConfig.initialData}
                                                />
                                            </div>
                                            <div className="border-bottom-p-grey-13"></div>
                                            <div className="px-3">
                                                <div
                                                    role="button"
                                                    onClick={() => handleLogout()}
                                                    className="text-p-red font-weight-400 font-size-13 text-decoration-none"
                                                >
                                                    <i
                                                        className="ip ip-arrow-left-border bg-p-red align-middle"
                                                        style={{ height: "19px" }}
                                                    ></i>
                                                    <span className="ps-1">Keluar</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Dropdown.Menu>
                        </Dropdown>
                    </li>
                </ul>
                <ul className="nav-right">
                    <li className={`${styles.navItem}`}>
                        <div
                            className={`d-flex align-items-center gap-2 pt-2 ${styles.navLink}`}
                        >
                            <Dropdown
                                className="el-dropdown dropdown-active-blue"
                                id="dropdown-active-blue"
                                align="end"
                            >
                                <Dropdown.Toggle
                                    as={({ onClick }, ref) => (
                                        <div
                                            role="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                onClick(e);
                                            }}
                                            className="btn border-0 p-2 position-relative"
                                        >
                                            <i
                                                style={{ height: "30px", width: "30px" }}
                                                className="ip ip-notification bg-black"
                                            ></i>
                                            {
                                                (queryDataNotification?.data && queryDataNotification?.data.length) ?

                                                    <span
                                                        className="position-absolute translate-middle bg-p-red-7 border border-light rounded-circle"
                                                        style={{
                                                            height: "18px",
                                                            width: "18px",
                                                            top: "13px",
                                                            right: "0px",
                                                            color: "white",
                                                            fontSize: "10px"
                                                        }}
                                                    >{queryDataNotification?.data.length}</span>
                                                    : <></>
                                            }
                                        </div>
                                    )}
                                ></Dropdown.Toggle>
                                <Dropdown.Menu
                                    className="el-dropdown-menu border-p-grey-13"
                                    style={{ width: "calc(100% + 400px)" }}
                                >
                                    <div className="card border-0 p-0">
                                        <div
                                            className="px-4 pt-2 pb-3 hstack align-items-center justify-content-between">
                                            <div>
                                                <span className="text-p-black-2 font-size-14 font-weight-500 pe-3">
                                                    Notifikasi
                                                </span>
                                            </div>
                                        </div>
                                        <div
                                            className="overflow-auto vstack border-top-p-blue-12"
                                            style={{ maxHeight: "calc(700px - 200px)" }}
                                        >
                                            {
                                                isLoadingNotification ? (
                                                    <div
                                                        className="hstack align-items-start px-4 py-3 border-bottom-p-blue-12 gap-3 hover-bg-p-blue-12">
                                                        <div>
                                                            <SkeletonItem
                                                                className="rounded-circle bg-p-grey-8"
                                                                style={{ height: "40px", width: "40px" }}
                                                            />
                                                        </div>
                                                        <div>
                                                            <div
                                                                className="font-size-14 font-weight-500 text-p-black-6">
                                                                <SkeletonItem
                                                                    className="radius-10 bg-p-grey-8"
                                                                    style={{ height: "25px", minWidth: "250px" }}
                                                                />
                                                            </div>
                                                            <div
                                                                className="pt-3 font-size-14 font-weight-500 text-p-grey-52">
                                                                <SkeletonItem
                                                                    className="radius-10 bg-p-grey-8"
                                                                    style={{ height: "15px", minWidth: "120px" }}
                                                                />
                                                            </div>
                                                        </div>
                                                    </div>
                                                ) : (
                                                    <>
                                                        {
                                                            queryDataNotification?.data?.map((item, index) => (
                                                                <div key={index}
                                                                    className="hstack align-items-start px-4 py-3 border-bottom-p-blue-12 gap-3 hover-bg-p-blue-12">
                                                                    <div>
                                                                        <Image
                                                                            src="/alert-notif.png"
                                                                            alt="profile notif"
                                                                            height="32"
                                                                            width="32"
                                                                        />
                                                                    </div>
                                                                    <div>
                                                                        <div
                                                                            className="font-size-15 font-weight-600 text-p-black-6">
                                                                            {
                                                                                item.title
                                                                            }
                                                                        </div>
                                                                        <div
                                                                            className="font-size-14 font-weight-500 text-p-black-6">
                                                                            {
                                                                                item.message
                                                                            }
                                                                        </div>
                                                                        <div className="pt-3">
                                                                            <div
                                                                                className="text-p-grey-52 font-weight-500 font-size-14">
                                                                                {
                                                                                    item.created_at
                                                                                }
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                    </>
                                                )
                                            }
                                        </div>
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
}
