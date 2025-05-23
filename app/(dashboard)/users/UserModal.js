import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient, useQuery } from "react-query";
import ModalContent from "@/components/ModalContent";
import { customStyles } from "@/components/SelectLabel";
import { mutateApi, queryApi  } from "@/utils/Libs/axios";
import Select from "react-select";
import queryString from 'query-string';
import { toast } from "react-toastify";

export default function UserModal({ show, onHide, mode = "create", initialData = {} }) {
    const { register, reset,handleSubmit, setValue, formState: { errors  }, watch} = useForm();
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hidePassword, setHidePassword] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);
    const [hidePin, setHidePin] = useState(false);
    const [hideConfirmPin, setHideConfirmPin] = useState(false);
    const [projectKeyword, setProjectKeyword] = useState(null);

    const urlRole = queryString.stringifyUrl(
        {
            url: '/roles/list',
            query: {
                page_size: 1000,
            },
        }
    );
    const { data: roleData, isLoading: isLoadingRole } = useQuery(["roleList"], () => queryApi(urlRole), { keepPreviousData: false });

    // Function to map API response to SelectLabel format
    const mapRoleOptions = (data, labelKey = "name", valueKey = "id") =>
        data?.map((item) => ({ label: item[labelKey], value: item[valueKey] })) || [];

    // Convert API response
    const roleOptions = mapRoleOptions(roleData?.roles?.data);


    const urlProject = queryString.stringifyUrl(
        {
            url: '/projects/list',
            query: {
                page_size: 10,
                sort: 'name',
                type: 'asc',
                keyword: projectKeyword,
            },
        }
    );
    const { data: projectData, isLoading: isLoadingProject } = useQuery(["projectList", projectKeyword], () => queryApi(urlProject), { keepPreviousData: false });

    // Function to map API response to SelectLabel format
    const mapProjectOptions = (data, labelKey = "name", valueKey = "id") =>
        data?.map((item) => ({ label: item[labelKey], value: item[valueKey] })) || [];

    // Convert API response
    const projectOptions = mapProjectOptions(projectData?.data?.data);

    // Populate form with initial data when in update mode
    useEffect(() => {
        if (mode === "update" && initialData) {
            setValue("name", initialData.name);
            setValue("email", initialData.email);
            setValue("role", initialData.roles[0]?.id || null);
            setValue("project_id", initialData.user_config[0]?.project_id || null);
            setProjectKeyword(initialData.user_config[0]?.project?.name || null);
        }
    }, [mode, initialData, setValue]);

    // API call for creating or updating shift
    const mutation = useMutation(
        (data) => {
            const apiUrl = mode === "create" ? "/users/store" : `/users/update/${initialData.id}`;
            const method = mode === "create" ? "POST" : "PUT";
            return mutateApi({ url: apiUrl, method, data });
        },
        {
            onMutate: () => setIsSubmitting(true),
            onSuccess: () => {
                toast.success(`User ${mode === "create" ? "created" : "updated"} successfully.`);
                queryClient.invalidateQueries("users_list");
                reset();
                onHide();
            },
            onError: () => {
                toast.error(`Failed to ${mode === "create" ? "create" : "update"} user. Please try again.`);
            },
            onSettled: () => setIsSubmitting(false)
        }
    );

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show, reset]);

    const onSubmit = (data) => mutation.mutate(data);

    return (
        <ModalContent
            title={mode === "create" ? "Create User" : "Update User"}
            show={show}
            onHide={onHide}
            classNameHeader="px-4 py-3 d-flex flex-column align-items-start gap-1"
            size="lg"
            centered
            classNameHeaderTitle="font-size-16 font-weight-700"
            classNameHeaderSubtitle="font-size-14 font-weight-400 text-muted"
            contentClassName="bg-white border-0"
            bodyClassName="p-4"
            scrollable
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <label className="form-label font-size-14">Name</label>
                    <input
                        type="text"
                        className={`form-control ${errors.name ? "is-invalid" : ""}`}
                        {...register("name", { required: "Name is required." })}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label font-size-14">Email</label>
                    <input
                        type="text"
                        className={`form-control ${errors.email ? "is-invalid" : ""}`}
                        {...register("email", { required: "Email is required." })}
                    />
                    {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
                </div>
                <div className="form-group">
                    <div className="form-input">
                        <label className="form-label font-size-14">Password</label>
                        <input
                            type={`${hidePassword ? "text" : "password"}`}
                            className={`form-control ${errors.password ? "is-invalid" : ""}`}
                            placeholder="Password"
                            {...register("password", { required: (mode === 'create') ? "Password is required." : false })}
                        />
                        {hidePassword ? (
                            <div
                                role="button"
                                onClick={() => setHidePassword(false)}
                                className="icon-right"
                            >
                                <i className="ip ip-eye bg-p-grey-50 mt-4"></i>
                            </div>
                        ) : (
                            <div
                                role="button"
                                onClick={() => setHidePassword(true)}
                                className="icon-right"
                            >
                                <i className="ip ip-eye-hide bg-p-grey-50 mt-4"></i>
                            </div>
                        )}
                        {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-input">
                        <label className="form-label font-size-14">Password Confirm</label>
                        <input
                            type={`${hideConfirmPassword ? "text" : "password"}`}
                            className={`form-control ${errors.password_confirmation ? "is-invalid" : ""}`}
                            placeholder="Confirm Password"
                            {...register("password_confirmation", {
                                required: (mode === 'create') ? true : false,
                                validate: (val) => {
                                    if (watch('password') != val) {
                                        return "Your passwords do no match";
                                    }
                                },
                            })}
                        />
                        {hideConfirmPassword ? (
                            <div
                                role="button"
                                onClick={() => setHideConfirmPassword(false)}
                                className="icon-right"
                            >
                                <i className="ip ip-eye bg-p-grey-50 mt-4"></i>
                            </div>
                        ) : (
                            <div
                                role="button"
                                onClick={() => setHideConfirmPassword(true)}
                                className="icon-right"
                            >
                                <i className="ip ip-eye-hide bg-p-grey-50 mt-4"></i>
                            </div>
                        )}
                        {errors.password_confirmation && <div className="invalid-feedback">{errors.password_confirmation.message}</div>}
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-input">
                        <label className="form-label font-size-14">PIN</label>
                        <input
                            type={`${hidePin ? "number" : "password"}`}
                            className={`form-control ${errors.pin ? "is-invalid" : ""}`}
                            placeholder="Pin"
                            maxLength={6}
                            {...register("pin", { required: (mode === 'create') ? "PIN is required." : false })}
                        />
                        {hidePin ? (
                            <div
                                role="button"
                                onClick={() => setHidePin(false)}
                                className="icon-right"
                            >
                                <i className="ip ip-eye bg-p-grey-50 mt-4"></i>
                            </div>
                        ) : (
                            <div
                                role="button"
                                onClick={() => setHidePin(true)}
                                className="icon-right"
                            >
                                <i className="ip ip-eye-hide bg-p-grey-50 mt-4"></i>
                            </div>
                        )}
                        {errors.pin && <div className="invalid-feedback">{errors.pin.message}</div>}
                    </div>
                </div>
                <div className="form-group">
                    <div className="form-input">
                        <label className="form-label font-size-14">Pin Confirm</label>
                        <input
                            type={`${hideConfirmPin ? "number" : "password"}`}
                            className={`form-control ${errors.pin_confirmation ? "is-invalid" : ""}`}
                            placeholder="Confirm Pin"
                            maxLength={6}
                            {...register("pin_confirmation", {
                                required: (mode === 'create') ? true : false,
                                validate: (val) => {
                                    if (watch('pin') != val) {
                                        return "Your pin do no match";
                                    }
                                },
                            })}
                        />
                        {hideConfirmPin ? (
                            <div
                                role="button"
                                onClick={() => setHideConfirmPin(false)}
                                className="icon-right"
                            >
                                <i className="ip ip-eye bg-p-grey-50 mt-4"></i>
                            </div>
                        ) : (
                            <div
                                role="button"
                                onClick={() => setHideConfirmPin(true)}
                                className="icon-right"
                            >
                                <i className="ip ip-eye-hide bg-p-grey-50 mt-4"></i>
                            </div>
                        )}
                        {errors.pin_confirmation && <div className="invalid-feedback">{errors.pin_confirmation.message}</div>}
                    </div>
                </div>
                <div className="form-group">
                    <label className="form-label font-size-14">Role</label>
                    <Select
                        styles={customStyles}
                        options={roleOptions}
                        placeholder="Select Role"
                        onChange={(selectedOption) => setValue("role", selectedOption ? selectedOption.value : null)}
                        isClearable={true}
                        isSearchable={true}
                        isLoading={isLoadingRole}
                        defaultValue={(initialData.roles && initialData.roles[0]) ? roleOptions.find((option) => option.value === initialData.roles[0].id) : null}
                    />
                    {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label font-size-14">Select Project</label>
                    <Select
                        options={projectOptions}
                        placeholder="Select Project"
                        styles={customStyles}
                        isClearable={true}
                        isSearchable={true}
                        isLoading={isLoadingProject}
                        onChange={(selectedOption) => setValue("project_id", selectedOption ? selectedOption.value : null)}
                        onInputChange={(inputValue) => {
                            setProjectKeyword(inputValue);
                        }}
                        defaultValue={(initialData.user_config && initialData.user_config[0]) ? projectOptions.find((option) => option.value === initialData.user_config[0]?.project_id) : null}
                        value={projectOptions.find((option) => option.value === watch("project_id"))}
                    />
                    {errors.project_id && <div className="invalid-feedback">{errors.project_id.message}</div>}
                </div>
                <button disabled={isSubmitting} type="submit" className="btn btn-primary w-100 mt-4">
                    {
                        isSubmitting ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : mode === "create" ? "Create User" : "Update User"
                    }
                </button>
            </form>
        </ModalContent>
    );
}
