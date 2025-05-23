"use client";
import { useQuery } from "react-query";
import { queryApi } from "@/utils/Libs/axios";
import SkeletonItem from "@/components/Skeleton/SkeletonItem";
import Tooltip from '@/components/Tooltip/Tooltip';
import { useRouter } from "next/navigation";
import React from "react";
import { isCan } from "@/utils/Helpers/Helper";

export default function CardAnalytics() {
    const router = useRouter();
    const url = '/dashboard/counts';
    const { data: queryDataCard, isLoading: isLoadingCard } = useQuery(
        ['card_analytics'],
        () => queryApi(url),
        { keepPreviousData: false }
    );

    const SkeletonLoader = () => (
        <SkeletonItem
            className="radius-10 bg-p-grey-12"
            style={{ height: "40px", minWidth: "100%" }}
        />
    );

    const cardsData1 = [
        { title: "Total User", valueKey: "user_count", url: "", permission: false },
        { title: "Total Project", valueKey: "project_count", url: "", permission: false },
        { title: "Total Progres", valueKey: "progres_count", url: "", permission: false },
    
    ];

    return (
        <>
            {
                isCan("dashboard") &&
                <>
                    <div
                        className="d-flex flex-wrap gap-2 justify-content-between mb-2"
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                            gap: "15px",
                        }}
                    >
                        {cardsData1.map(({ title, valueKey, url, permission }, index) => (
                            (queryDataCard?.[valueKey + '_data'] && queryDataCard?.[valueKey + '_data'].length) ?
                                <Tooltip key={index} data={queryDataCard?.[valueKey + '_data']} width={"220px"}>
                                    <div className="card text-start shadow" style={{ flex: 1, cursor: (url && permission) ? "pointer" : "default" }} onClick={
                                        async () => {
                                            if (url && permission) router.push(url)
                                        }
                                    } >
                                        <div className="card-body">
                                            <div className="font-size-16 font-weight-400 text-p-neutral-100">
                                                {title}
                                            </div>
                                            <div className="font-size-25 font-weight-500 text-p-primary-70 py-2">
                                                {isLoadingCard ? <SkeletonLoader /> : queryDataCard?.[valueKey]}
                                            </div>
                                            <div className="font-size-16 font-weight-400 text-p-neutral-100">
                                                {
                                                    (valueKey == "tap_card") ? "Kali" : "Pekerja"
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </Tooltip>
                                : 
                                <div key={index} width={"220px"}>
                                    <div className="card text-start shadow" style={{ width: "220px", flex: 1, cursor: (url && permission) ? "pointer" : "default" }} onClick={
                                        async () => {
                                            if (url && permission) router.push(url)
                                        }
                                    } >
                                        <div className="card-body">
                                            <div className="font-size-16 font-weight-400 text-p-neutral-100">
                                                {title}
                                            </div>
                                            <div className="font-size-25 font-weight-500 text-p-primary-70 py-2">
                                                {isLoadingCard ? <SkeletonLoader /> : queryDataCard?.[valueKey]}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        ))}
                    </div>
                </>
            }
        </>
    );
}
