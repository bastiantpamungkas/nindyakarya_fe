import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import ModalContent from "@/components/ModalContent";
import { customStyles } from "@/components/SelectLabel";
import { mutateApi } from "@/utils/Libs/axios";
import Select from "react-select";
import { toast } from "react-toastify";

export default function ProgresModal({ show, onHide, mode = "create", initialData = {} }) {
    const { register, reset,handleSubmit, setValue, formState: { errors  }} = useForm();
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const statusOptions = [
        { value: 0, label: 'created' }, 
        { value: 1, label: 'Approve VP QHSE' },
        { value: 2, label: 'Approved PM' },
        { value: 3, label: 'Rejected' },
    ];

    // Populate form with initial data when in update mode
    useEffect(() => {
        if (mode === "update" && initialData) {
            setValue("date", initialData.date);
            setValue("progress", initialData.progress);
            setValue("description", initialData.description);
            setValue("evidance", initialData.images);
            setValue("status", initialData.status);
        }
    }, [mode, initialData, setValue]);

    // API call for creating or updating shift
    const mutation = useMutation(
        (data) => {
            const apiUrl = mode === "create" ? "/progres/store" : `/progres/update/${initialData.id}`;
            const method = mode === "create" ? "POST" : "POST";
            return mutateApi({ 
                url: apiUrl, 
                method, 
                data,
                contentType: "multipart/form-data"
            });
        },
        {
            onMutate: () => setIsSubmitting(true),
            onSuccess: () => {
                toast.success(`Progres ${mode === "create" ? "created" : "updated"} successfully.`);
                queryClient.invalidateQueries("progress_list");
                reset();
                onHide();
            },
            onError: () => {
                toast.error(`Failed to ${mode === "create" ? "create" : "update"} progres. Please try again.`);
            },
            onSettled: () => setIsSubmitting(false)
        }
    );

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show, reset]);

    const onSubmit = (data) => {
        const formData = new FormData();
        formData.append("date", data.date);
        formData.append("progress", data.progress);
        formData.append("description", data.description);
        if (mode === "update") {
            formData.append("status", data.status);
        }    

        if (data.images && data.images.length > 0) {
            Array.from(data.images).forEach((file) => {
                formData.append("images[]", file);
            });
        }
    
        mutation.mutate(formData);
    };

    return (
        <ModalContent
            title={mode === "create" ? "Create Progres" : "Update Progres"}
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
                    <label className="form-label font-size-14">Date</label>
                    <input
                        type="date"
                        className={`form-control ${errors.date ? "is-invalid" : ""}`}
                        {...register("date", { required: "Date is required." })}
                    />
                    {errors.date && <div className="invalid-feedback">{errors.date.message}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label font-size-14">Progress (%)</label>
                    <input
                        type="number"
                        max={100}
                        className={`form-control ${errors.progress ? "is-invalid" : ""}`}
                        {...register("progress", { required: "Progress is required." })}
                    />
                    {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label font-size-14">Description</label>
                    <textarea
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        rows={5}
                        {...register("description")}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                </div>
                <div className="form-group">
                    <label className="form-label font-size-14">Upload Images</label>
                    <input
                        type="file"
                        className="form-control"
                        multiple // Allow multiple file uploads
                        accept="image/*" // Restrict to image files
                        {...register("images", {
                            validate: (files) => {
                                if (files.length > 5) {
                                    return "You can upload up to 5 images.";
                                }
                                return true;
                            },
                        })}
                    />
                    {errors.images && <div className="invalid-feedback">{errors.images.message}</div>}
                </div>
                {
                    mode === "update" && (
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
                    )
                }

                <button disabled={isSubmitting} type="submit" className="btn btn-primary w-100 mt-4">
                    {
                        isSubmitting ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : mode === "create" ? "Create Progres" : "Update Progres"
                    }
                </button>
            </form>
        </ModalContent>
    );
}
