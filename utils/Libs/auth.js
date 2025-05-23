import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import {jwt} from "@/utils/Libs/jwt";

export const authOptions = {
    session: {
        strategy: "jwt",
        maxAge: 24 * 60 * 60,
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: {
                    label: "Email",
                    type: "text",
                    placeholder: "Email",
                },
                password: {
                    label: "Password",
                    type: "password",
                },
            },
            async authorize(credentials, req) {
                try {
                    const res = await axios.post(
                        `${process.env.NEXT_PUBLIC_API_URL}/login`,
                        credentials
                    );
                    console.log(`AUTHORIZE ${res}`)
                    return Promise.resolve(res?.data);
                } catch (e) {
                    const msg =
                        e?.response?.data?.message ??
                        "Login gagal, coba lagi beberapa saat";
                    throw new Error(msg);
                }
            },
        }),
    ],

    callbacks: {
        redirect: async (url, baseUrl) => {
            const { baseUrl: baseUrlRedirect, url: urlRedirect } = url ?? {
                baseUrl: "",
                url: "",
            };

            return urlRedirect;
        },
        async jwt({ token, user, trigger, session }) {
            if (user) {
                return { ...token, ...user };
            }

            const { exp: accessTokenExpires } = jwt.decode(token.token);

            if (!accessTokenExpires) {
                return token;
            }

            const currentUnixTimestamp = Math.floor(Date.now() / 1000);
            const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires;

            if (accessTokenHasExpired) {
                return await refreshAccessToken(token);
            }

            return token;
        },
        async session({ session, token }) {
            if (token.error) {
                throw new Error("Refresh token has expired");
            }

            session.access_token = token.token;
            session.user = token.user || "";
            session.role = token.user.roles || "";
            return session;
        },
    },
    events: {
        async signOut({ token }) {
            await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/logout`, {
                headers: {
                    Authorization: `Bearer ${token.token}`,
                },
            });
        },
    },

    pages: {
        signIn: "/",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

async function refreshAccessToken(token) {
    try {
        const response = await axios.post(
            process.env.NEXT_PUBLIC_BACKEND_API_URL + "/refresh",
            {
                token: token.access_token,
            }
        );

        if (!response.ok) throw response;

        const refreshedAccessToken = await response.json();
        const { exp } = jwt.decode(refreshedAccessToken.access_token);

        return {
            ...token,
            access_token: refreshedAccessToken.access_token,
            exp,
        };
    } catch (error) {
        return {
            ...token,
            error: "RefreshAccessTokenError",
        };
    }
}
