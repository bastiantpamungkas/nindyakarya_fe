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
import ProjectModal from "@/app/(dashboard)/projects/ProjectModal";
import { isCan } from "@/utils/Helpers/Helper";

export default function Page() {
    const { tableState, setTableState } = useServerTable();
    const [modalConfig, setModalConfig] = useState({ show: false, mode: "create", initialData: {} });
    const {setAlertConfirmation} = useAlertConfirmationStore();
    const queryClient = useQueryClient();

    let actionTableButton = [];
    if (isCan("projects-update")) {
        actionTableButton.push("edit");
    }
    if (isCan("projects-delete")) {
        actionTableButton.push("delete");
    }

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            sortable: true,
        },
        {
            accessorKey: 'description',
            header: 'Description',
            sortable: true,
            cell: ({ row }) => <div style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{row.original.description || ""}</div>,
        },
        {
            id: 'actions',
            header: 'Action',
            cell: (info) => (
                <Dropdown
                    id={info.row.original.id}
                    menu={actionTableButton}
                    path="projects_list"
                    onEdit={() => openModal("update", info.row.original)}
                    onDelete={(id) => {
                        setAlertConfirmation({
                            show: true,
                            title: "Delete Project",
                            message: "Are you sure you want to delete this project?",
                            titleConfirm: "Delete",
                            handleClick: async () => {
                                await mutateApi({
                                    url: `/projects/delete/${info.row.original.id}`,
                                    method: "DELETE",
                                });
                                await queryClient.invalidateQueries("projects_list");
                    
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
        baseUrl: '/projects/list',
        tableState,
        additionalParam: {},
    });

    const { data: queryData, isLoading } = useQuery(
        ['projects_list', url],
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

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="font-size-24 font-weight-500 text-p-primary-70 mb-4">
                    Project List
                </div>
                {
                    (isCan('projects-create'))  &&
                        <button
                            className="btn btn-p-primary px-3 py-2"
                            onClick={() => openModal("create")}
                        >
                            <Plus className="me-2"/>
                            <span>Add Project</span>
                        </button>
                }
            </div>
            <ServerTable
                columns={columns}
                data={isCan("projects") ? (queryData?.data?.data ?? []) : []}
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
            <ProjectModal
                show={modalConfig.show}
                onHide={closeModal}
                mode={modalConfig.mode}
                initialData={modalConfig.initialData}
            />
        </>
    )
}
