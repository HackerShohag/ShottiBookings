'use client';

import React, { useEffect, useState } from "react";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { siteConfig } from "@/config/site";

async function getProfile() {
    const session = await getServerSession();

    console.log(session);

    const profile = await fetch(siteConfig.backendServer.address + "/api/user/get-customer", {
        method: "GET",
        headers: {
            'content-type': 'application/json',
        },
        // Include the credentials in the request
        credentials: 'include',
    });

    const data = await profile.json();
    console.log(data);

    return data; // Return the profile data
}

export default function ProfilePage() {
    const [profileData, setProfileData] = useState(null);

    useEffect(() => {
        // Use an async function inside useEffect
        const fetchData = async () => {
            const data = await getProfile();
            setProfileData(data);
        };

        fetchData(); // Invoke the async function
    }, []); // Empty dependency array to run the effect once on mount

    let tabs = [
        {
            id: "profile",
            label: "Profile",
            content: (
                <Card>
                    <CardHeader className="text-2xl justify-center">Profile</CardHeader>
                    <CardBody>
                        <p>Name: {profileData?.name}</p>
                        <p>Email: {profileData?.email}</p>
                        <p>Phone: {profileData?.phone}</p>
                    </CardBody>
                </Card>
            ),
        },
        {
            id: "edit",
            label: "Edit",
            content: <Card>
                <CardHeader className="text-2xl justify-center">Edit Profile</CardHeader>
                <CardBody>
                    <p>
                        Name: { }
                    </p>
                    <p>
                        Email: { }
                    </p>
                    <p>
                        Phone: { }
                    </p>
                </CardBody>
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
        }
    ];

    return (
        <div className="flex w-full flex-col">
            <Tabs className=" flex w-full flex-col p-2" aria-label="Dynamic tabs" items={tabs}>
                {(item) => (
                    <Tab key={item.id} title={item.label}>
                        <Card>
                            <CardBody>{item.content}</CardBody>
                        </Card>
                    </Tab>
                )}
            </Tabs>
        </div>
    );
}
