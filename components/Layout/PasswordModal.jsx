import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import ModalContent from "@/components/ModalContent";
import { mutateApi } from "@/utils/Libs/axios";
import { toast } from "react-toastify";

export default function PasswordModal({ show, onHide, handleLogout, mode = "create", initialData = {} }) {
    const { register, reset, handleSubmit, setValue, formState: { errors }, watch } = useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [hideOldPassword, setHideOldPassword] = useState(false);
    const [hideNewPassword, setHideNewPassword] = useState(false);
    const [hideConfirmPassword, setHideConfirmPassword] = useState(false);

    // Populate form with initial data when in update mode
    useEffect(() => {
        if (mode === "update" && initialData) {
            setValue("old_password", initialData.old_password);
            setValue("new_password", initialData.new_password);
            setValue("new_password_confirmation", initialData.new_password_confirmation);
        }
    }, [mode, initialData, setValue]);

    // API call for creating or updating shift
    const mutation = useMutation(
        (data) => {
            const method = "POST";
            return mutateApi({ url: "/change_password", method, data });
        },
        {
            onMutate: () => setIsSubmitting(true),
            onSuccess: () => {
                toast.success("Password berhasil diganti.");
                reset();
                onHide();
                handleLogout();
            },
            onError: () => {
                toast.error("Gagal Mengganti Password. Silakan coba lagi.");
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
            title="Change Password"
            show={show}
            onHide={onHide}
            classNameHeader="px-4 py-3 d-flex flex-column align-items-start gap-1"
            size="md"
            centered
            classNameHeaderTitle="font-size-16 font-weight-700"
            classNameHeaderSubtitle="font-size-14 font-weight-400 text-muted"
            contentClassName="bg-white border-0"
            bodyClassName="p-4"
            scrollable
        >
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-12">
                        <div className="form-group mb-3">
                            <div className="form-input">
                                <label htmlFor="old_password" className="font-size-14 font-weight-400 text-p-black">Password</label>
                                <input
                                    type={`${hideOldPassword ? "text" : "password"}`}
                                    className={`form-control ${errors.old_password ? "is-invalid" : ""}`}
                                    placeholder="Old Password"
                                    {...register("old_password", { required: "Old Password is required." })}
                                />
                                {hideOldPassword ? (
                                    <div
                                        role="button"
                                        onClick={() => setHideOldPassword(false)}
                                        className="icon-right"
                                    >
                                        <i className="ip ip-eye bg-p-grey-50 mt-3"></i>
                                    </div>
                                ) : (
                                    <div
                                        role="button"
                                        onClick={() => setHideOldPassword(true)}
                                        className="icon-right"
                                    >
                                        <i className="ip ip-eye-hide bg-p-grey-50 mt-3"></i>
                                    </div>
                                )}
                                {errors.old_password && <div className="invalid-feedback">{errors.old_password.message}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group mb-3">
                            <div className="form-input">
                                <label htmlFor="new_password" className="font-size-14 font-weight-400 text-p-black">New Password</label>
                                <input
                                    type={`${hideNewPassword ? "text" : "password"}`}
                                    className={`form-control ${errors.new_password ? "is-invalid" : ""}`}
                                    placeholder="New Password"
                                    {...register("new_password", { required: "New Password is required." })}
                                />
                                {hideNewPassword ? (
                                    <div
                                        role="button"
                                        onClick={() => setHideNewPassword(false)}
                                        className="icon-right"
                                    >
                                        <i className="ip ip-eye bg-p-grey-50 mt-3"></i>
                                    </div>
                                ) : (
                                    <div
                                        role="button"
                                        onClick={() => setHideNewPassword(true)}
                                        className="icon-right"
                                    >
                                        <i className="ip ip-eye-hide bg-p-grey-50 mt-3"></i>
                                    </div>
                                )}
                                {errors.new_password && <div className="invalid-feedback">{errors.new_password.message}</div>}
                            </div>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="form-group mb-3">
                            <div className="form-input">
                                <label htmlFor="new_password_confirmation" className="font-size-14 font-weight-400 text-p-black">Confirm Password</label>
                                <input
                                    type={`${hideConfirmPassword ? "text" : "password"}`}
                                    className={`form-control ${errors.new_password_confirmation ? "is-invalid" : ""}`}
                                    placeholder="Confirm Password"
                                    {...register("new_password_confirmation", {
                                        required: true,
                                        validate: (val) => {
                                            if (watch('new_password') != val) {
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
                                        <i className="ip ip-eye bg-p-grey-50 mt-3"></i>
                                    </div>
                                ) : (
                                    <div
                                        role="button"
                                        onClick={() => setHideConfirmPassword(true)}
                                        className="icon-right"
                                    >
                                        <i className="ip ip-eye-hide bg-p-grey-50 mt-3"></i>
                                    </div>
                                )}
                                {errors.new_password_confirmation && <div className="invalid-feedback">{errors.new_password_confirmation.message}</div>}
                            </div>
                        </div>
                    </div>
                </div>
                <button disabled={isSubmitting} type="submit" className="btn btn-primary w-100 mt-4">
                    {isSubmitting ? (
                        <div className="spinner-border spinner-border-sm" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    ) : (
                        "Ganti Password"
                    )}
                </button>
            </form>
        </ModalContent>
    );
}
