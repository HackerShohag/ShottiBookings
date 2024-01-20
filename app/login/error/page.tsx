'use client';

import { Button, Card } from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

export default function LoginForm() {
    const router = useRouter();
    const { data: session } = useSession();

    if (session) {
        router.push('/');
        router.refresh();
    }

    return (
        <Card className="w-full max-w-md p-8 gap-5">
            <h1 className="text-3xl">Error</h1>
            <p>Error logging in. Please, try again!</p>
            <Button
                fullWidth
                type="submit"
                color="secondary"
                onClick={() => {
                    router.push('/login');
                    router.refresh();
                }}
            >LogIn Page
            </Button>
        </Card>
    );
}
