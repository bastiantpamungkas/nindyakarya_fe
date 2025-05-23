"use client";

import useServerTable from "@/hooks/useServerTable";
import { Plus } from "lucide-react";
import React from "react";
import { buildPaginatedTableURL } from "@/utils/Libs/table";
import { useQueryClient, useQuery } from "react-query";
import { mutateApi, queryApi } from "@/utils/Libs/axios";
import ServerTable from "@/components/Table/ServerTable";
import Dropdown from '@/components/Dropdown_v1/Dropdown';
import useAlertConfirmationStore from "@/stores/useAlertConfirmationStore";
import Link from "@/Link";
import { useRouter } from "next/navigation";
import { isCan } from "@/utils/Helpers/Helper";

export default function Page() {
    const route = useRouter();
    const {setAlertConfirmation} = useAlertConfirmationStore();
    const queryClient = useQueryClient();
    const { tableState, setTableState } = useServerTable();

    let actionTableButton = [];
    if (isCan("role-update")) {
        actionTableButton.push("edit");
    }
    if (isCan("role-delete")) {
        actionTableButton.push("delete");
    }

    const columns = [
        {
            accessorKey: "name",
            header: "Name",
            size: 600,
            minSize: 650,
            sortable: true,
            cell: ({ row }) => (
                <div>
                    {row.original.name}
                </div>
            ),
        },
        {
            id: "actions",
            header: "Action",
            cell: (info) => (
                <Dropdown
                    id={info.row.original.id}
                    menu={actionTableButton}
                    onEdit={() => route.push(`/role/update/${info.row.original.id}`)}
                    onDelete={(id) => {
                        setAlertConfirmation({
                            show: true,
                            title: "Delete Role",
                            message: "Are you sure you want to delete this role?",
                            titleConfirm: "Delete",
                            handleClick: async () => {
                                await mutateApi({
                                    url: `/roles/delete/${info.row.original.id}`,
                                    method: "DELETE",
                                });
                                await queryClient.invalidateQueries("roleList");
                    
                                setAlertConfirmation({
                                    show: false,
                                })
                            },
                    
                        })
                    }}
                    path="roleList"
                />
            ),
        },
    ];

    const url = buildPaginatedTableURL({
        baseUrl: "/roles/list",
        tableState
    });

    const { data: queryData, isLoading } = useQuery(
        ["roleList", url],
        () => queryApi(url),
        { keepPreviousData: false }
    );

    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-4">
                <h4 className="font-weight-500 text-p-primary-70">Daftar Role</h4>
                {
                    isCan("role") && 
                        <Link href="/role/create" className="btn btn-p-primary px-3 py-2">
                            <Plus className="me-2" />
                            Tambah Role
                        </Link>
                }
            </div>
            <ServerTable
                columns={columns}
                data={(isCan("role")) ? (queryData?.roles?.data ?? []) : []}
                meta={{ ...queryData?.roles, data: undefined }}
                isLoading={isLoading}
                tableState={tableState}
                setTableState={setTableState}
                className='mt-8'
                withFilter
            />
        </>
    );
}
