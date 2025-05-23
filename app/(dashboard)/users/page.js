"use client"

import useServerTable from "@/hooks/useServerTable";
import { Plus } from 'lucide-react';
import React, {useState} from "react";
import {buildPaginatedTableURL} from "@/utils/Libs/table";
import {useMutation, useQueryClient, useQuery} from "react-query";
import { mutateApi, queryApi} from "@/utils/Libs/axios";
import ServerTable from "@/components/Table/ServerTable";
import Dropdown from '@/components/Dropdown_v1/Dropdown';
import useAlertConfirmationStore from "@/stores/useAlertConfirmationStore";
import UserModal from "@/app/(dashboard)/users/UserModal";
import { isCan } from "@/utils/Helpers/Helper";

export default function Page() {
    const { tableState, setTableState } = useServerTable();
    const [modalConfig, setModalConfig] = useState({ show: false, mode: "create", initialData: {} });
    const {setAlertConfirmation} = useAlertConfirmationStore();
    const queryClient = useQueryClient();

    let actionTableButton = [];
    if (isCan("users-update")) {
        actionTableButton.push("edit");
    }
    if (isCan("users-delete")) {
        actionTableButton.push("delete");
    }

    const columns = [
        {
            accessorKey: 'name',
            header: 'Name',
            sortable: true,
        },
        {
            accessorKey: 'email',
            header: 'Email',
            sortable: true,
        },
        {
            id: 'roles',
            header: 'Roles',
            cell: (info) => (
                info.row.original.roles.map((role, index) => (
                    <span key={index} className="badge bg-primary me-1">
                        {role.name}
                    </span>
                ))
            ),
        },
        {
            id: 'projects',
            header: 'Project',
            cell: (info) => (
                info.row.original.user_config.map((value, index) => (
                    <span key={index} className="badge bg-secondary me-1">
                        {value.project?.name}
                    </span>
                ))
            ),
        },
        {
            id: 'actions',
            header: 'Action',
            cell: (info) => (
                <Dropdown
                    id={info.row.original.id}
                    menu={actionTableButton}
                    path="users_list"
                    onEdit={() => openModal("update", info.row.original)}
                    onDelete={(id) => {
                        setAlertConfirmation({
                            show: true,
                            title: "Delete User",
                            message: "Are you sure you want to delete this user?",
                            titleConfirm: "Delete",
                            handleClick: async () => {
                                await mutateApi({
                                    url: `/users/delete/${info.row.original.id}`,
                                    method: "DELETE",
                                });
                                await queryClient.invalidateQueries("users_list");
                    
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
        baseUrl: '/users/list',
        tableState,
        additionalParam: {},
    });

    const { data: queryData, isLoading } = useQuery(
        ['users_list', url],
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
                    User List
                </div>
                {
                    (isCan('users-create'))  &&
                        <button
                            className="btn btn-p-primary px-3 py-2"
                            onClick={() => openModal("create")}
                        >
                            <Plus className="me-2"/>
                            <span>Add User</span>
                        </button>
                }
            </div>
            <ServerTable
                columns={columns}
                data={isCan("users") ? (queryData?.data?.data ?? []) : []}
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
            <UserModal
                show={modalConfig.show}
                onHide={closeModal}
                mode={modalConfig.mode}
                initialData={modalConfig.initialData}
            />
        </>
    )
}
