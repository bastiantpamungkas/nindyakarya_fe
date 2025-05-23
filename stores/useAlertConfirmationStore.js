import { create } from "zustand";

const useAlertConfirmationStore = create((set) => ({
    alertConfirmation: {
        show: false,
        title: "",
        message: "",
        titleConfirm: "",
        handleClick: () => {},
        onHide: () => {},
        loadingProcess: false,
    },
    setAlertConfirmation: (alertConfirmation) =>
        set((state) => ({ alertConfirmation: { ...state.alertConfirmation, ...alertConfirmation } })),
    resetAlertConfirmation: () =>
        set((state) => ({
            alertConfirmation: {
                show: false,
                title: "",
                message: "",
                titleConfirm: "",
                handleClick: () => {},
                onHide: () => {},
                loadingProcess: false,
            },
        })),
}));

export default useAlertConfirmationStore;
