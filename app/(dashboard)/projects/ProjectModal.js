import React, {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import ModalContent from "@/components/ModalContent";
import { customStyles } from "@/components/SelectLabel";
import { mutateApi } from "@/utils/Libs/axios";
import Select from "react-select";
import { toast } from "react-toastify";

export default function ProjectModal({ show, onHide, mode = "create", initialData = {} }) {
    const { register, reset,handleSubmit, setValue, formState: { errors  }} = useForm();
    const queryClient = useQueryClient();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Populate form with initial data when in update mode
    useEffect(() => {
        if (mode === "update" && initialData) {
            setValue("name", initialData.name);
            setValue("description", initialData.description);
        }
    }, [mode, initialData, setValue]);

    // API call for creating or updating shift
    const mutation = useMutation(
        (data) => {
            const apiUrl = mode === "create" ? "/projects/store" : `/projects/update/${initialData.id}`;
            const method = mode === "create" ? "POST" : "PUT";
            return mutateApi({ url: apiUrl, method, data });
        },
        {
            onMutate: () => setIsSubmitting(true),
            onSuccess: () => {
                toast.success(`Project ${mode === "create" ? "created" : "updated"} successfully.`);
                queryClient.invalidateQueries("projects_list");
                reset();
                onHide();
            },
            onError: () => {
                toast.error(`Failed to ${mode === "create" ? "create" : "update"} project. Please try again.`);
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
            title={mode === "create" ? "Create Project" : "Update Project"}
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
                    <label className="form-label font-size-14">Description</label>
                    <textarea
                        className={`form-control ${errors.description ? "is-invalid" : ""}`}
                        rows={5}
                        {...register("description")}
                    />
                    {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
                </div>

                <button disabled={isSubmitting} type="submit" className="btn btn-primary w-100 mt-4">
                    {
                        isSubmitting ? (
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : mode === "create" ? "Create Project" : "Update Project"
                    }
                </button>
            </form>
        </ModalContent>
    );
}
