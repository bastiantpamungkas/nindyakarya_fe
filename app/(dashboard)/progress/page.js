"use client"

import useServerTable from "@/hooks/useServerTable";
import { Plus } from 'lucide-react';
import React, {useState} from "react";
import {buildPaginatedTableURL} from "@/utils/Libs/table";
import {useQueryClient, useQuery} from "react-query";
import { mutateApi, queryApi} from "@/utils/Libs/axios";
import ServerTable from "@/components/Table/ServerTable";
import Dropdown from '@/components/Dropdown_v1/Dropdown';
import useAlertConfirmationStore from "@/stores/useAlertConfirmationStore";
import ProgresModal from "@/app/(dashboard)/progress/ProgresModal";
import QRModal from "@/app/(dashboard)/progress/QRModal";
import ApproveModal from "@/app/(dashboard)/progress/ApproveModal";
import RejectModal from "@/app/(dashboard)/progress/RejectModal";
import { isCan } from "@/utils/Helpers/Helper";
import { QrCodeIcon, CheckCircleIcon, CheckIcon, ShieldCloseIcon } from "lucide-react";

export default function Page() {
    const { tableState, setTableState } = useServerTable();
    const [modalConfig, setModalConfig] = useState({ show: false, mode: "create", initialData: {} });
    const [modalQRConfig, setModalQRConfig] = useState({ show: false, mode: "create", initialData: {} });
    const [modalApproveConfig, setModalApproveConfig] = useState({ show: false, mode: "create", initialData: {} });
    const [modalRejectConfig, setModalRejectConfig] = useState({ show: false, mode: "create", initialData: {} });
    const {setAlertConfirmation} = useAlertConfirmationStore();
    const queryClient = useQueryClient();

    let actionTableButton = [];
    if (isCan("progress-update")) {
        actionTableButton.push("edit");
    }
    if (isCan("progress-delete")) {
        actionTableButton.push("delete");
    }

    const statusOptions = [
        { value: 0, label: 'created' }, 
        { value: 1, label: 'Approve VP QHSE' },
        { value: 2, label: 'Approved PM' },
        { value: 3, label: 'Rejected' },
    ];

    const columns = [
        {
            accessorKey: 'date',
            header: 'Date',
            sortable: true,
        },
        {
            accessorKey: 'project_id',
            header: 'Project',
            sortable: true,
            cell: ({ row }) => <div>{row.original.project?.name || ""}</div>,
        },
        {
            accessorKey: 'progress',
            header: 'Progress (%)',
            sortable: true,
            className: 'text-end',            
        },
        {
            accessorKey: 'description',
            header: 'Description',
            sortable: true,
            cell: ({ row }) => <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{row.original.description || ""}</div>,
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: (info) => (
                <div className="text-center">
                    <span className={`badge ${info.row.original.status === 0 ? "bg-secondary" : info.row.original.status === 1 ? "bg-success" : info.row.original.status === 2 ? "bg-primary" : "bg-danger"}`}>
                        {statusOptions.find(option => option.value === info.row.original.status)?.label}
                    </span>
                    <br/>
                    {
                        info.row.original.status === 0 && (
                            <>
                                <button className="badge bg-primary mt-2" title="Approve PM" onClick={(e) => {
                                            openApproveModal("update", info.row.original)
                                        }
                                    }
                                >
                                    <CheckCircleIcon className="text-white" size={16} />
                                </button>
                                <button className="badge bg-danger mt-2" title="Reject" onClick={(e) => {
                                            openRejectModal("update", info.row.original)
                                        }
                                    }
                                >
                                    <ShieldCloseIcon className="text-white" size={16} />
                                </button>
                            </>        
                        )
                    }
                    {
                        info.row.original.status === 2 && (
                            <>
                                <button className="badge bg-success mt-2" title="Approve VP QHSE" onClick={(e) => {
                                            openApproveModal("update", info.row.original)
                                        }
                                    }
                                >
                                    <CheckIcon className="text-white" size={16} />
                                </button>
                                <button className="badge bg-danger mt-2" title="Reject" onClick={(e) => {
                                            openRejectModal("update", info.row.original)
                                        }
                                    }
                                >
                                    <ShieldCloseIcon className="text-white" size={16} />
                                </button>
                            </>       
                        )
                    } 
                    {
                        info.row.original.status === 3 && (
                            <>
                                <button className="badge bg-primary mt-2" title="Approve PM" onClick={(e) => {
                                            openApproveModal("update", info.row.original)
                                        }
                                    }
                                >
                                    <CheckCircleIcon className="text-white" size={16} />
                                </button>
                            </>       
                        )
                    }   
                </div>
            ),
        },
        {
            id: 'media',
            header: 'Media',
            cell: (info) => (
                info.row.original.media.map((value, index) => (
                    <a href={value.original_url} title={value.name} key={index} className="badge bg-secondary me-1" target="_blank" rel="noopener noreferrer"> 
                        {value.name}
                    </a>
                ))
            ),    
        },
        {
            id: 'id',
            header: 'QR Code',
            sortable: true,
            cell: ({ row }) => (
                <button 
                    className="badge bg-primary" 
                    title="Generate QR"
                    onClick={(e) => {
                        e.preventDefault();
                        openQRModal("update", row.original)
                    }}
                >
                    <QrCodeIcon className="text-white" size={16} />
                </button>
            ),
        },
        {
            id: 'actions',
            header: 'Action',
            cell: (info) => (
                <Dropdown
                    id={info.row.original.id}
                    menu={actionTableButton}
                    path="progress_list"
                    onEdit={() => openModal("update", info.row.original)}
                    onDelete={(id) => {
                        setAlertConfirmation({
                            show: true,
                            title: "Delete Progres",
                            message: "Are you sure you want to delete this progres?",
                            titleConfirm: "Delete",
                            handleClick: async () => {
                                await mutateApi({
                                    url: `/progres/delete/${info.row.original.id}`,
                                    method: "DELETE",
                                });
                                await queryClient.invalidateQueries("progress_list");
                    
                                setAlertConfirmation({
                                    show: false,
                                })
                            },
                    
                        })
                    }}
                />
            ),
        },
    ];

    const url = buildPaginatedTableURL({
        baseUrl: '/progres/list',
        tableState,
        additionalParam: {},
    });

    const { data: queryData, isLoading } = useQuery(
        ['progress_list', url],
        () => queryApi(url),
        {
            keepPreviousData: false,
        }
    );

    const openModal = (mode, data = {}) => {
        setModalConfig({ show: true, mode, initialData: data });
    };

    const closeModal = () => {
        setModalConfig({ ...modalConfig, show: false });
    };

    const openQRModal = (mode, data = {}) => {
        setModalQRConfig({ show: true, mode, initialData: data });
    };

    const closeQRModal = () => {
        setModalQRConfig({ ...modalQRConfig, show: false });
    };

    const openApproveModal = (mode, data = {}) => {
        setModalApproveConfig({ show: true, mode, initialData: data });
    };

    const closeApproveModal = () => {
        setModalApproveConfig({ ...modalApproveConfig, show: false });
    };

    const openRejectModal = (mode, data = {}) => {
        setModalRejectConfig({ show: true, mode, initialData: data });
    };

    const closeRejectModal = () => {
        setModalRejectConfig({ ...modalQRConfig, show: false });
    };

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="font-size-24 font-weight-500 text-p-primary-70 mb-4">
                    Progres List
                </div>
                {
                    (isCan('progress-create'))  &&
                        <button
                            className="btn btn-p-primary px-3 py-2"
                            onClick={() => openModal("create")}
                        >
                            <Plus className="me-2"/>
                            <span>Add Progres</span>
                        </button>
                }
            </div>
            <ServerTable
                columns={columns}
                data={isCan("progress") ? (queryData?.data?.data ?? []) : []}
                meta={{...queryData?.data, data: undefined}}
                header={
                    <>
                        {/*<CustomDropdown*/}
                        {/*    label="Filters"*/}
                        {/*    icon={<Filter size={15}/>}*/}
                        {/*    items={['Filter 1', 'Filter 2']}*/}
                        {/*    menuStyle={{*/}
                        {/*        left: "-67%",*/}
                        {/*    }}*/}
                        {/*/>*/}
                    </>

                }
                isLoading={isLoading}
                tableState={tableState}
                setTableState={setTableState}
                className='mt-8'
                withFilter
            />
            <ProgresModal
                show={modalConfig.show}
                onHide={closeModal}
                mode={modalConfig.mode}
                initialData={modalConfig.initialData}
            />
            <QRModal
                show={modalQRConfig.show}
                onHide={closeQRModal}
                mode={modalQRConfig.mode}
                initialData={modalQRConfig.initialData}
            />
            <ApproveModal
                show={modalApproveConfig.show}
                onHide={closeApproveModal}
                mode={modalApproveConfig.mode}
                initialData={modalApproveConfig.initialData}
            />
            <RejectModal
                show={modalRejectConfig.show}
                onHide={closeRejectModal}
                mode={modalRejectConfig.mode}
                initialData={modalRejectConfig.initialData}
            />
        </>
    )
}
