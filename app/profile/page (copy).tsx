'use client';

import { Button, Card, CardBody } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { useState, useEffect } from "react";

export const Profile = async () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const session = await getServerSession();

    if (session) {
        setName(session.user?.name ? session.user?.name : "Name Not Found");
        setEmail(session.user?.email ? session.user.email : "Email Not Found");
        console.log(session);
    }

    return (
        <Card className="flex-row">
            <CardBody className="flex gap-5">
                <Button >
                    Profile
                </Button>
                <Button >
                    Edit Info
                </Button>
                <Button >
                    Past Journies
                </Button>
                <Button >
                    Past Journies
                </Button>
            </CardBody>
            <CardBody></CardBody>
            <CardBody className="flex gap-5">
                <Button >
                    Information
                </Button>
                <Button >
                    Information
                </Button>
            </CardBody>
        </Card>
    );
};

export default function ProfilePage() {
    return (
        <Profile />
    );
}