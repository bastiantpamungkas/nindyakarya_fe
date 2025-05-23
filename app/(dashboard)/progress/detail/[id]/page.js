"use client"

import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useParams } from "next/navigation";
import { queryApi } from "@/utils/Libs/axios";
import { User } from "lucide-react";
import Link from "@/Link";
import QRCode from "react-qr-code";

export default function DetailProgress() {
    const { id } = useParams();
    const { data: progresData, isLoading, refetch: refetchProgres } = useQuery(["progresDetail", id], () =>
        queryApi(`/progres/detail/${id}`)
    );

    const statusOptions = [
        { value: 0, label: 'created' },
        { value: 1, label: 'Approve VP QHSE' },
        { value: 2, label: 'Approved PM' },
        { value: 3, label: 'Rejected' },
    ];

    const handleRefetch = async () => {
        await refetchProgres();
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

    // Show 404 page if progresData.data is null
    if (!progresData?.data) {
        return (
            <div className="text-center mt-5">
                <h1>404</h1>
                <p>Progress not found.</p>
                <Link href="/progress" className="btn btn-primary">
                    Go Back to Progress List
                </Link>
            </div>
        );
    }

    return (
        <div>
            <h4 className="font-weight-500 text-p-primary-70 mb-4">
                <Link href="/role" className="btn border-0 p-2"><i className="ip ip-arrow-left" style={{ width: "30px", height: "30px", backgroundColor: "#194BFB" }}></i></Link>Role
            </h4>
            <div className="card p-4">
                <div className="d-flex align-items-center gap-2 mb-4">
                    <User className="text-p-primary-70" />
                    <div className="font-weight-400 text-p-primary-70">Detail Progres #{progresData.data?.id}
                        <span className={`badge ms-2 ${progresData.data?.status === 0 ? "bg-secondary" : progresData.data?.status === 1 ? "bg-success" : progresData.data?.status === 2 ? "bg-primary" : "bg-danger"}`}>
                            {statusOptions.find((option) => option.value === progresData.data?.status)?.label}
                        </span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <div className="font-weight-400 text-bold">Officer : {progresData.data?.user?.name}</div>
                    </div>
                    <div className="col-md-12">
                        <div className="form-group text-left my-4">
                            <QRCode
                                value={`${process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"}/progress/detail/${progresData.data?.id || "No ID"}`}
                                size={300}
                            />
                        </div>
                    </div>  
                    <div className="col-md-12">
                        <div className="font-weight-400 text-bold">{progresData.data?.date}</div>
                    </div>
                    <div className="col-md-12">
                        <div className="font-weight-400 text-bold">{progresData.data?.project?.name}</div>
                    </div>
                    <div className="col-md-12">
                        <div className="font-weight-400 text-bold">{progresData.data?.project?.description}</div>
                    </div>
                    <div className="col-md-12">
                        <div className="font-weight-400 text-bold">Progress : {progresData.data?.progress} %</div>
                    </div>
                </div>
            </div>

            { 
                progresData.data?.media?.count &&
                    <div className="card p-4 mt-4">
                        <div className="d-flex align-items-center gap-2 mb-4">
                            <User className="text-p-primary-70" />
                            <div className="font-weight-400 text-p-primary-70">Evidance :</div>
                        </div>
                        <div className="row">
                            {
                                progresData.data?.media.map((value, index) => (
                                    <div className="col-md-3" key={index}>
                                        <img src={value.original_url} alt={value.name} className="img-fluid" style={{ maxWidth: "100%", height: "auto", marginBottom: "10px" }} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
            }
        </div>
    );
}
