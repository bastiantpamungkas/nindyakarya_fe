import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import ModalContent from "@/components/ModalContent";
import QRCode from "react-qr-code";

export default function QRModal({ show, onHide, mode = "create", initialData = {} }) {
    const { register, reset, setValue, formState: { errors } } = useForm();

    // Populate form with initial data when in update mode
    useEffect(() => {
        if (show && mode === "update" && initialData) {
            setValue("id", initialData.id || "");
        }
    }, [show, mode, initialData, setValue]);

    useEffect(() => {
        if (!show) {
            reset();
        }
    }, [show, reset]);

    return (
        <ModalContent
            title="QR Code"
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
            <div className="form-group text-center mt-4">
                <QRCode
                    value={`${process.env.NEXT_PUBLIC_BASE_URL || "https://example.com"}/progress/detail/${initialData.id || "No ID"}`}
                    size={300}
                />
            </div>
        </ModalContent>
    );
}