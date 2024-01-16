import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { siteConfig } from '@/config/site';

export const options: NextAuthOptions = {
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {

                const res = await fetch(siteConfig.backendServer.address + "/auth/login", {
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json',
                        'withCredentials': 'true'
                    },
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    })
                });

                const data = await res.json();

                if (res.ok && data) {
                    console.log("User has been logged in.");
                    console.log(data.data.token);
                    return {
                        ...data?.data?.user,
                        token: data?.data?.token
                    };
                }
                return null;
            },
        })
    ],
    callbacks: {
        async jwt(params) {
            const { token, user } = params;
            if (user) {
                token.accessToken = user.token;
            }
            return token;
        },
        async session(params) {
            const { session, token } = params;
            session.accessToken = token.accessToken;
            return session;
        }
    }
}