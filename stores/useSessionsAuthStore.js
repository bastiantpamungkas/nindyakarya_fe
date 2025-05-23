import { create } from "zustand";
import { persist } from "zustand/middleware";

const useSessionUser = create(
    persist(
        (set) => ({
            sessionUser: null,
            statusAuth: null,
            setSessionUser: (sessionUser, statusAuth) => set({ sessionUser: {
                    ...sessionUser,
                    roles: sessionUser?.user?.roles?.map((role) => role.name),
                    permissions: sessionUser?.user?.permissions?.map((permission) => permission.name),
                }, statusAuth: statusAuth }),
        }),
        { name: "session-user" }
    )
);

export default useSessionUser;
