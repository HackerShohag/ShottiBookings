'use client';

import React, { FormEvent, useState } from "react";
import { Input, Button, Card, Link, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from "@nextui-org/react";
import { MailIcon, PasswordIcon, LoadingIcon } from './Icons';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginForm() {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [processing, setProcessing] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setProcessing(true);

        const response = await signIn('credentials', {
            email: username,
            password: password,
            redirect: false,
        });

        if (response?.ok) {
            onOpen();
            // router.back();
            // router.refresh();
        }
    };

    let isInvalid = false;

    return (
        <>
            <Card className="w-full max-w-md p-8">
                <h1 className="text-3xl">Log In</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                        type="email"
                        label="Email"
                        name="email"
                        placeholder="you@example.com"
                        labelPlacement="outside"
                        isInvalid={isInvalid}
                        errorMessage={isInvalid ? "Please enter a valid email address" : null}
                        startContent={
                            <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        fullWidth
                        isRequired
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="password"
                        label="Password"
                        name="password"
                        placeholder="********"
                        labelPlacement="outside"
                        startContent={
                            <PasswordIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        fullWidth
                        isRequired
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        fullWidth
                        isDisabled={processing}
                        type="submit"
                        color="secondary"
                        spinner={<LoadingIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                    >{processing ?
                        <Spinner size="sm" /> : "Log In"
                        }
                    </Button>
                    <p className="text-center text-small">
                        Need to create an account?{" "}
                        <Link size="sm" href="/register">
                            Sign up
                        </Link>
                    </p>
                </form>
            </Card >
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Log In Successful</ModalHeader>
                            <ModalBody>
                                <p>
                                    You have been successfully logged in.
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={() => {
                                    onClose();
                                    router.push('/');
                                    router.refresh();
                                }}>
                                    Go Home
                                </Button>
                                <Button color="primary" onPress={() => {
                                    onClose();
                                    router.push('/profile');
                                    router.refresh();
                                }}>
                                    Profile
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
