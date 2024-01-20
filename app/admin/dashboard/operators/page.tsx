'use client';

import Content from "@/components/Dashboard/AdminContent";
import { Button, Card, CardBody, CardFooter, CardHeader, CircularProgress } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status !== 'loading' && session?.user.role !== "admin") {
        router.replace("/");
    }

    return (
        <>
            {status === 'loading' ? (
                <Card className="flex flex-col w-full justify-center">
                    <CardHeader className="text-2xl justify-center">Loading...</CardHeader>
                    <CardBody className="flex flex-col w-full items-center h-full">
                        <CircularProgress className="flex flex-col w-full justify-center" color="primary" size="lg" aria-label="Loading..." />
                    </CardBody>
                    <CardFooter className="flex flex-col w-full justify-center">
                        <Button color="primary" onClick={() => router.push('/')}>Go Home</Button>
                    </CardFooter>
                </Card>
            ) : (
                session?.user.role === 'admin' ? (
                    <Content />
                ) : (
                    <Card className="flex justify-center">
                        <CardHeader className="flex justify-center">Access Denied</CardHeader>
                        <CardBody className="flex justify-center items-center">You are not authorized to access this page.</CardBody>
                        <CardFooter className="flex justify-center">
                            <Button color="danger" onClick={() => router.replace("/")}>Go Home</Button>
                        </CardFooter>
                    </Card>
                )
            )}
        </>
    );
}