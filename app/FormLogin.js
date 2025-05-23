"use client";
import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {useRouter, useSearchParams} from "next/navigation";
import IconLockLogin from "@/components/IconLockLogin";
import {signIn} from "next-auth/react";

export default function FormLogin() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') ?? `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`;
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [hidePassword, setHidePassword] = useState(false);
    const {
        handleSubmit,
        register,
        clearErrors,
        reset,
        formState: {errors},
    } = useForm();
    const submitData = async (form) => {
        setLoading(true);
        const credentials = {
            ...form,
            callbackUrl: callbackUrl,
            redirect: false,
        };
        const result = await signIn("credentials", credentials);
        if (result.error) {
            setLoading(false);
            setError(result.error);
        } else {
            clearErrors();
            reset();
            await router.push("/dashboard");
        }
    };

    return (
        <>
            <div className="text-center" style={{marginBottom: "35px"}}>
                <div className="mb-2">
                    <IconLockLogin/>
                </div>
                <div className="font-weight-600 font-size-20 text-p-black-4">
                    Selamat datang!
                </div>
                <div className="font-weight-400 font-size-16 text-p-black-4">
                    Masukkan akun Anda untuk mengelola Project.
                </div>
            </div>
            <form onSubmit={handleSubmit(submitData)}>
                {error && (
                    <div
                        className="font-size-14 alert bg-p-red-3 text-p-red font-weight-600 d-flex align-items-center justify-content-between">
                        <div className="">{error}</div>
                        <div role="button" onClick={() => setError(null)}>
                            <i className="fas fa-times font-size-20"></i>
                        </div>
                    </div>
                )}
                <div className="form-group mb-4">
                    <div className="form-input">
                        <div className="icon-card-input">
                            <i className="ip ip-profile bg-p-blue-21"></i>
                        </div>
                        <input
                            className={`form-control-input radius-10 w-100 ${
                                errors?.email && "is-invalid"
                            }`}
                            placeholder="Email"
                            {...register("email", {
                                required: "Email tidak boleh kosong",
                            })}
                        />
                    </div>
                    {errors?.email?.message && (
                        <div className="text-p-red font-size-14 pt-2">
                            {errors?.email?.message}
                        </div>
                    )}
                </div>
                <div className="form-group mb-4">
                    <div className="form-input">
                        <div className="icon-card-input">
                            <i className="ip ip-lock bg-p-blue-21"></i>
                        </div>
                        <input
                            type={`${hidePassword ? "text" : "password"}`}
                            id="inputPassword"
                            className={`form-control-input radius-10 w-100 ${
                                errors?.password && "is-invalid"
                            }`}
                            placeholder="Password"
                            {...register("password", {
                                required: "Password tidak boleh kosong",
                            })}
                        />
                        {hidePassword ? (
                            <div
                                role="button"
                                onClick={() => setHidePassword(false)}
                                className="icon-right"
                            >
                                <i className="ip ip-eye bg-p-grey-50"></i>
                            </div>
                        ) : (
                            <div
                                role="button"
                                onClick={() => setHidePassword(true)}
                                className="icon-right"
                            >
                                <i className="ip ip-eye-hide bg-p-grey-50"></i>
                            </div>
                        )}
                    </div>
                    {errors?.password?.message && (
                        <div className="text-p-red font-size-14 pt-2">
                            {errors?.password?.message}
                        </div>
                    )}
                </div>
                <div style={{marginTop: "35px"}}>
                    <button
                        className="btn btn-p-blue-21 radius-10
                     w-100 text-center font-size-16
                     font-weight-600"
                        style={{height: "52px"}}
                        disabled={loading ? true : false}
                    >
                        {loading ? "loading..." : "Log In"}
                    </button>
                </div>
            </form>
        </>
    );
}
