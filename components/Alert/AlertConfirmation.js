import React from "react";
import useAlertConfirmationStore from "@/stores/useAlertConfirmationStore";
import ModalConfirmation from "@/components/ModalConfirmation";

export default function AlertConfirmation() {
    const {
        alertConfirmation,
        resetAlertConfirmation,
    } = useAlertConfirmationStore();
    return (
        <ModalConfirmation
            onHide={resetAlertConfirmation}
            show={alertConfirmation?.show}
            titleConfirm={alertConfirmation?.titleConfirm}
            title={alertConfirmation?.title}
            handleClick={alertConfirmation?.handleClick}
            message={alertConfirmation?.message}
            style={{
                zIndex: '999999'
            }}
        />
    );
}
