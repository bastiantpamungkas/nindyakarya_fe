"use client"

import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import { queryApi } from "@/utils/Libs/axios";
import RoleForm from "@/app/(dashboard)/role/RoleForm";
import { User } from "lucide-react";
import Link from "@/Link";

export default function UpdateRolePage() {
    const { id } = useParams();
    const { data: roleData, isLoading, refetch: refetchRole } = useQuery(["roleDetail", id], () =>
        queryApi(`/roles/edit-role/${id}`)
    );

    // Fetch data for permissions
    const { data: permissionsCategoryData, isLoading: isLoadingPermissionsCategory } = useQuery(
        "permissionsCategoryList",
        () => queryApi("/roles/permissions_category"),
        { keepPreviousData: false }
    );

    const { data: permissionsData, isLoading: isLoadingPermissions, refetch: refetchPermissions } = useQuery(
        "permissionsList",
        () => queryApi("/roles/permissions")
    );

    const checkBoxData = () => {
        let data = [];
        for (let indexCategory = 0; indexCategory < permissionsCategoryData?.permissionCategory.length; indexCategory++) {
            let dataPermission = [];
            let totalPermissionCategory = 0;
            let totalSelectedPermissionCategory = 0;
            if (permissionsData?.permissions && permissionsData?.permissions.length) {
                for (let index = 0; index < permissionsData?.permissions.length; index++) {
                    if (permissionsData?.permissions[index].category == permissionsCategoryData?.permissionCategory[indexCategory].category) {
                        totalPermissionCategory = totalPermissionCategory + 1;
                        const isSelected = roleData?.role?.permissions.some((selectedItem) => {
                            return selectedItem.name == permissionsData?.permissions[index].name;
                        });

                        if (isSelected) {
                            totalSelectedPermissionCategory = totalSelectedPermissionCategory + 1;
                        }

                        dataPermission.push({
                            [permissionsData?.permissions[index].name] : isSelected
                        })
                    }
                }
            }

            data[`${permissionsCategoryData?.permissionCategory[indexCategory].category}_check_all`] = (totalSelectedPermissionCategory == totalPermissionCategory);
            data[`${permissionsCategoryData?.permissionCategory[indexCategory].category}`] = dataPermission;
        }
        return data;
    }

    const handleRefetch = async () => {
        await refetchRole();
        await refetchPermissions();
    }

    useEffect(() => {
        handleRefetch()
    }, [id])


    if (isLoading) {
        return <div className="col-12">
            <div className="card-table-body">
                <div className="row pt-4 pb-3">
                    <div className="col-md-4">
                        <div
                            className="skeleton-box bg-p-grey-12 radius-10"
                            style={{ height: "35px", width: "100%" }}
                        ></div>
                    </div>
                    <div className="col-md-2 ms-auto">
                        <div
                            className="skeleton-box bg-p-grey-12 rounded"
                            style={{ height: "35px", width: "100%" }}
                        ></div>
                    </div>
                </div>
                <div
                    className="skeleton-box bg-p-grey-12 radius-12 mb-3"
                    style={{ height: "300px", width: "100%" }}
                ></div>
            </div>
        </div>;
    }

    return (
        <div>
            <h4 className="font-weight-500 text-p-primary-70 mb-4">
                <Link href="/role" className="btn border-0 p-2"><i className="ip ip-arrow-left" style={{ width: "30px", height: "30px", backgroundColor: "#194BFB" }}></i></Link>Role
            </h4>
            <div className="card p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                    <User className="text-p-primary-70" />
                    <div className="font-weight-400 text-p-primary-70">Edit Role</div>
                </div>
                <RoleForm mode="update" initialData={{
                    ...checkBoxData(),
                    id: roleData?.role?.id || "",
                    name: roleData?.role?.name || "",
                    guard_name: roleData?.role?.guard_name || "",
                }} />
            </div>
        </div>
    );
}
