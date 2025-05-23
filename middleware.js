import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import navData from "./components/Layout/Sidebar/Sidebar.constants";

let dataRoute = [];

navData &&
navData.map((item) => {
    if (item.link != "#") {
        dataRoute.push(item.link);
    } else if (item.navItems) {
        item.navItems.map((valueNavItem) => {
            dataRoute.push(valueNavItem.link);
        });
    }
});

const authRoutes = dataRoute;
const guestRoutes = ["/", "forgot-password"];

export default withAuth(
    async function middleware(request) {
        const token = await getToken({
            req: request,
            secret: process.env.NEXTAUTH_SECRET,
        });

        const sessionUserRoles = token?.user?.roles?.map((role) => role.name);
        const sessionsUserPermissions = token?.user?.roles[0]?.permissions?.map(
            (permission) => permission.name
        );

        const isIndexpage = request.nextUrl.pathname === "/";
        const isAuthRoute = authRoutes.some((route) =>
            request.nextUrl.pathname.startsWith(route)
        );
        const isGuestRoute = guestRoutes.some((route) =>
            request.nextUrl.pathname.startsWith(route)
        );

        if (!token && isAuthRoute) {
            const redirectUrl = new URL("/", request.url);
            redirectUrl.searchParams.set("callbackUrl", request.nextUrl.href);
            return NextResponse.redirect(redirectUrl);
        }

        if (token && isIndexpage)
            return NextResponse.redirect(new URL("/dashboard", request.url));

        if (isAuthRoute) {
            const isPermissionRoute = navData.some((item) => {
                const roles = item?.roles || [];
                const permissions = item?.permissions || [];
                const isRoleMatch = roles.some((role) =>
                    sessionUserRoles?.includes(role)
                );
                const isPermissionMatch = permissions.some((permission) =>
                    sessionsUserPermissions?.includes(permission)
                );
                return (
                    (item.link === "#" && item.navItems
                        ? item.navItems.some((navItem) =>
                            request.nextUrl.pathname.startsWith(navItem.link)
                        )
                        : request.nextUrl.pathname.startsWith(item.link)) &&
                    // (isRoleMatch || isPermissionMatch)
                    (isPermissionMatch)
                );
            });

            if (!isPermissionRoute)
                return NextResponse.redirect(new URL("/denied", request.url));
        }
    },
    {
        callbacks: {
            async authorized() {
                return true;
            },
        },
    }
);
