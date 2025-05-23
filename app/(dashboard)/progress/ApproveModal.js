import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import ModalContent from "@/components/ModalContent";
import { customStyles } from "@/components/SelectLabel";
import { mutateApi } from "@/utils/Libs/axios";
import Select from "react-select";
import { toast } from "react-toastify";

export default function ApproveModal({ show, onHide, mode = "create", initialData = {} }) {
    const { register, reset,handleSubmit, setValue, formState: { errors  }} = useForm();
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hidePin, setHidePin] = useState(true);

    const statusOptions = [
        { value: 1, label: 'Approve VP QHSE' },
        { value: 2, label: 'Approved PM' },
    ];

    // Populate form with initial data when in update mode
    useEffect(() => {
        if (mode === "update" && initialData) {
            setValue("status", initialData.status);
        }
    }, [mode, initialData, setValue]);

    // API call for creating or updating shift
    const mutation = useMutation(
        (data) => {
            const apiUrl = mode === "create" ? "/progres/store" : `/progres/update-status/${initialData.id}`;
            const method = mode === "create" ? "POST" : "PUT";
            return mutateApi({ 
                url: apiUrl, 
                method, 
                data,
            });
        },
        {
            onMutate: () => setIsSubmitting(true),
            onSuccess: () => {
                toast.success(`Progres ${mode === "create" ? "created" : "approve"} successfully.`);
                queryClient.invalidateQueries("progress_list");
                reset();
                onHide();
            },
            onError: () => {
                toast.error(`Failed to ${mode === "create" ? "create" : "approve"} progres. Please try again.`);
            },
            onSettled: () => setIsSubmitting(false)
        }
    );

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show, reset]);

    const onSubmit = (data) => { mutation.mutate(data) };

    return (
        <ModalContent
            title={mode === "create" ? "Create Progres" : "Approve Progres"}
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
                    <div className="form-input">
                        <label className="form-label font-size-14">PIN</label>
                        <input
                            type={`${hidePin ? "number" : "password"}`}
                            className={`form-control ${errors.pin ? "is-invalid" : ""}`}
                            placeholder="Pin"
                            maxLength={6}
                            {...register("pin", { required: "PIN is required." })}
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
                    <label className="form-label font-size-14">Status</label>
                    <Select
                        styles={customStyles}
                        options={statusOptions}
                        placeholder="Select Status"
                        onChange={(selectedOption) => setValue("status", selectedOption ? selectedOption.value : null)}
                        isClearable={true}
                        isSearchable={true}
                        defaultValue={statusOptions.find((option) => option.value === initialData.status) || null}
                    />
                    {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
                </div>

                <button disabled={isSubmitting} type="submit" className="btn btn-primary w-100 mt-4">
                    {
                        isSubmitting ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : mode === "create" ? "Create Progres" : "Approve Progres"
                    }
                </button>
            </form>
        </ModalContent>
    );
}
