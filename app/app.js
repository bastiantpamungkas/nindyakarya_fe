"use client";
import {SessionProvider} from "next-auth/react";
import "react-toastify/dist/ReactToastify.css";
import {ToastContainer} from "react-toastify";
import {QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import queryClient from "@/hooks/queryClient";
import {RouterEvents} from "@/router-event";
import LoaderMain from "@/components/LoaderMain";
import AlertConfirmation from "@/components/Alert/AlertConfirmation";

export default function App({children}) {
    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                {children}
                <LoaderMain/>
                <RouterEvents/>
                <ToastContainer stacked position="top-right"></ToastContainer>
                <AlertConfirmation />
            </SessionProvider>
            <ReactQueryDevtools initialIsOpen={false}/>
        </QueryClientProvider>
    );
}
