'use client';

import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader, Input, CardFooter, Button, CircularProgress, Textarea } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { siteConfig } from "@/config/site";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (!session && status !== 'loading') {
        router.replace("/login");
    }

    const [name, setName] = useState(session?.user.name);
    const [email, setEmail] = useState(session?.user.email);
    const [role, setRole] = useState(session?.user.role);

    const updateUserInfo = async () => {
        const data = await fetch(siteConfig.backendServer.address + "/api/user/update-customer/" + session?.user?.id, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
                'Authorization': `${session?.accessToken}`,
            },
            body: JSON.stringify({
                email: email,
                name: name,
            }),
        });

        const res = await data.json();
    }

    const getOfferedJourneys = async () => {
        const data = await fetch(siteConfig.backendServer.address + "/api/journey/getOfferedJourneys", {
            method: "GET",
            headers: {
                'content-type': 'application/json',
                'Authorization': `${session?.accessToken}`,
            },
        });

        const res = await data.json();
        console.log(res);
    }

    let tabs = [
        {
            id: "profile",
            label: "Profile",
            content: (
                <Card>
                    <CardHeader className="text-2xl justify-center">Profile</CardHeader>
                    <CardBody>
                        <Textarea
                            isReadOnly
                            label="Name:"
                            variant="bordered"
                            labelPlacement="outside"
                            placeholder="Enter your name"
                            defaultValue={session?.user.name}
                            minRows={1}
                        />
                        <Textarea
                            isReadOnly
                            label="Email:"
                            variant="bordered"
                            labelPlacement="outside"
                            placeholder="Enter your email"
                            defaultValue={session?.user.email}
                            minRows={1}
                        />
                        <Textarea
                            isReadOnly
                            label="Phone:"
                            variant="bordered"
                            labelPlacement="outside"
                            placeholder="Enter your phone"
                            defaultValue={session?.user.role}
                            minRows={1}
                        />
                    </CardBody>
                </Card>
            ),
        },
        {
            id: "edit",
            label: "Edit",
            content: <Card>
                <CardHeader className="text-2xl justify-center">Edit Profile</CardHeader>
                <CardBody className="flex-col gap-5">
                    <Input label="Name:" labelPlacement="outside" value={name} onChange={(e) => setName(e.target.value)} />
                    <Input label="Email:" labelPlacement="outside" value={email} onChange={(e) => setEmail(e.target.value)} />
                    <Input label="Role:" labelPlacement="outside" value={role} onChange={(e) => setRole(e.target.value)} disabled />
                </CardBody>
                <CardFooter>
                    <Button color="primary" onClick={updateUserInfo}>Update Information</Button>
                </CardFooter>
            </Card>
        },
        {
            id: "journeys",
            label: "Past Journey",
            content: <Card>
                <CardHeader className="text-2xl justify-center">Past Journeys</CardHeader>
                <CardBody>
                    <p>
                        You have no past journeys.
                    </p>
                </CardBody>
            </Card>
        },
        {
            id: "upcoming-journeys",
            label: "Upcoming Journey",
            content: <Card>
                <CardHeader className="text-2xl justify-center">Upcoming Journeys</CardHeader>
                <CardBody>
                    <p>
                        You have no upcoming journeys.
                    </p>
                </CardBody>
            </Card>
        }
    ];

    return (
        <div className="flex w-full flex-col">
            {
                session?.user.role === 'admin' ?
                    <div className="flex justify-between m-2">
                        <Button color="primary" onClick={() => { router.push('/'); router.refresh() }}>Go Home</Button>
                        <Button color="danger" onClick={() => { router.push('/admin/dashboard'); router.refresh() }}>Admin Dashboard</Button>
                    </div> :
                    session?.user.role === 'operator' ?
                        <div className="flex justify-between m-2">
                            <Button color="primary" onClick={() => { router.push('/'); router.refresh() }}>Go Home</Button>
                            <Button color="danger" onClick={() => { router.push('/operator/dashboard'); router.refresh() }}>Operator Dashboard</Button>
                        </div> :
                        null
            }
            {
                status === 'loading' ?
                    <Card className="flex flex-col w-full justify-center">
                        <CardHeader className="text-2xl justify-center">Loading...</CardHeader>
                        <CardBody className="flex flex-col w-full items-center h-full">
                            <CircularProgress className="flex flex-col w-full justify-center" color="primary" size="lg" aria-label="Loading..." />
                        </CardBody>
                        <CardFooter className="flex flex-col w-full justify-center">
                            <Button color="primary" onClick={() => router.push('/')}>Go Home</Button>
                        </CardFooter>
                    </Card> :
                    <Tabs className=" flex w-full flex-col p-2" aria-label="Dynamic tabs" items={tabs}>
                        {(item) => (
                            <Tab key={item.id} title={item.label}>
                                <Card>
                                    <CardBody>{item.content}</CardBody>
                                </Card>
                            </Tab>
                        )}
                    </Tabs>
            }
        </div>
    );
}
