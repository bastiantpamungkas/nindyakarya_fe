"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { mutateApi, queryApi } from "@/utils/Libs/axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import queryClient from "@/hooks/queryClient";

export default function RoleForm({ mode = "create", initialData = {}, isLoading }) {
    const router = useRouter();
    const { register, handleSubmit, control, reset, formState: { errors }, getValues, setValue } = useForm({
        defaultValues: initialData,
    });

    // Fetch data for permissions
    const { data: permissionsCategoryData, isLoading: isLoadingPermissionsCategory } = useQuery(
        "permissionsCategoryList",
        () => queryApi("/roles/permissions_category"),
        { keepPreviousData: false }
    );

    const { data: permissionsData, isLoading: isLoadingPermissions } = useQuery(
        "permissionsList",
        () => queryApi("/roles/permissions"),
        { keepPreviousData: false }
    );

    // Mutations for create and update
    const mutationUrl = mode === "create" ? "/roles/store" : `/roles/update-role/${initialData?.id}`;
    const {
        mutate: submitRole,
        isLoading: isSubmitting,
    } = useMutation((data) =>
        mutateApi({
            url: mutationUrl,
            method: mode === "create" ? "POST" : "PUT",
            data: {
                ...data
            },
        })
    );

    const checkboxGroupCategory = (category) => {
        let data = [];
        if (permissionsData?.permissions && permissionsData?.permissions.length) {
            for (let index = 0; index < permissionsData?.permissions.length; index++) {
                if (permissionsData?.permissions[index].category == category) {
                    data.push(permissionsData?.permissions[index])
                }
            }
        }
        return data;
    };

    const handleCheckboxAllChange = (el, category) => {
        const permissions = checkboxGroupCategory(category);
        if (permissions && permissions.length) {
            for (let index = 0; index < permissions.length; index++) {
                if (permissions[index].category == category) {
                    setValue(`${permissions[index].category}.${index}.${permissions[index].name}`, el.target.checked);
                }       
            }
        }
    };

    const handleCheckboxChange = (el, category) => {
        const permissions = checkboxGroupCategory(category);
        let totalPermissionCategory = 0;
        let totalSelectedPermissionCategory = 0;
        if (permissions && permissions.length) {
            for (let index = 0; index < permissions.length; index++) {
                if (permissions[index].category == category) {
                    totalPermissionCategory = totalPermissionCategory + 1;
                    const value = getValues(`${permissions[index].category}.${index}.${permissions[index].name}`);
                    if (value) {
                        totalSelectedPermissionCategory = totalSelectedPermissionCategory + 1;
                    }
                }       
            }
            if (el.target.checked) {
                totalSelectedPermissionCategory = totalSelectedPermissionCategory + 1;
            } else {
                totalSelectedPermissionCategory = totalSelectedPermissionCategory - 1;
            }
        }

        if (totalPermissionCategory == totalSelectedPermissionCategory) {
            setValue(`${category}_check_all`, true);
        } else {
            setValue(`${category}_check_all`, false);
        }
    };

    const onSubmit = (data) => {
        submitRole(data, {
            onSuccess: async () => {
                toast.success(
                    mode === "create" ? "Role berhasil ditambahkan." : "Data role berhasil diperbarui."
                );
                // refetch data RoleList
                reset();
                await queryClient.invalidateQueries("roleList");
                router.push("/role");
            },
            onError: () => {
                toast.error("Gagal menyimpan data role. Silakan coba lagi.");
            },
        });
    };

    useEffect(() => {
        if (mode === "update" && initialData) {
            reset(initialData);
        }
    }, [initialData, mode, reset]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-md-6">
                    <div className="mb-3">
                        <label htmlFor="name" className="font-size-14 font-weight-400 text-p-black">Nama Role</label>
                        <input
                            type="text"
                            className={`form-control ${errors.name ? "is-invalid" : ""}`}
                            placeholder="Masukkan Nama Role"
                            {...register("name", { required: "Name is required." })}
                        />
                        {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="mb-3 mt-1 float-end">
                        <button disabled={isSubmitting} type="submit" className="btn btn-primary mt-4 px-4">
                            {isSubmitting ? (
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            ) : (
                                <>Simpan Role</>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="font-weight-400 text-p-primary-70">Permisi</div>
                </div>
            </div>
            <div className="row">
                {
                    permissionsCategoryData?.permissionCategory.map((itemCategory, indexCategory) => (
                        <div key={indexCategory} className="col-md-12">
                            <div className="card shadow my-4">
                                <div className="card-header">
                                    <input className="checkbox" type="checkbox" {...register(`${itemCategory.category}_check_all`)} 
                                    onChange={e => {
                                        handleCheckboxAllChange(e, `${itemCategory.category}`);
                                    }}/>
                                    <label className="font-size-14 font-weight-400 text-p-black mx-2" htmlFor={`${itemCategory.category}_check_all`} style={{ textTransform: "capitalize" }}>{itemCategory.category.replace(/\_/g, ' ')}</label>
                                </div>
                                <div className="card-body">
                                    {
                                        checkboxGroupCategory(itemCategory.category).map((item, index) => (
                                            <div key={index}>
                                                <input className="checkbox" type="checkbox" {...register(`${itemCategory.category}.${index}.${item.name}`)} 
                                                onChange={e => {
                                                    handleCheckboxChange(e, `${itemCategory.category}`);
                                                }}/>
                                                <label className="font-size-14 font-weight-400 text-p-black mx-2" htmlFor={`${itemCategory.category}.${index}.${item.name}`} style={{ textTransform: "capitalize" }}>{item.name.replace(/\_/g, ' ')}</label>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </form>
    );
}
