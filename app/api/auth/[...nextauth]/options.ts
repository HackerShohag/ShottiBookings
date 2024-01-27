import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { siteConfig } from '@/config/site';

declare module "next-auth" {
    interface User {
        id: string;
        name: string;
        email: string;
        role: string;
    }
}

declare module "next-auth" {
    interface Session {
        accessToken: string;
        user: User;
    }
}

export const options: NextAuthOptions = {

    session: {
        strategy: 'jwt'
    },
    pages: {
        signIn: '/login',
        signOut: '/logout',
        error: '/login/error'
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
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'withCredentials': 'true'
                    },
                    body: JSON.stringify({
                        query: credentials?.email,
                        password: credentials?.password
                    })
                });

                const data = await res.json();
                console.log(data);

                if (res.ok && data) {
                    return data?.data;
                }
                return null;
            },
        })
    ],
    callbacks: {
        async jwt({ session, token, user }) {
            if (user) {
                token.accessToken = (user as { token?: string })?.token;
                token.role = user?.role;
                token.id = user?.id;
            }
            return token;
        },
        async session({ session, token, user }) {
            session.accessToken = token.accessToken as string;
            session.user.role = token.role as string;
            session.user.id = token.id as string;
            return session;
        },
    },

}