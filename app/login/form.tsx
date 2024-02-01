'use client';

import React, { FormEvent, useState, useEffect, use } from "react";
import { Input, Button, Card, Link, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Spinner } from "@nextui-org/react";
import { MailIcon, PasswordIcon } from './Icons';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import ShowHidePassword from "@/components/ShowHidePassword";

export default function LoginForm() {
    const router = useRouter();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { data: session, status } = useSession();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [redirectTimer, setRedirectTimer] = useState(0);

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setProcessing(true);

        const response = await signIn('credentials', {
            email: username,
            password: password,
            redirect: false,
        });

        if (response?.ok) {
            setIsError(false);
            setProcessing(false);
        } else {
            setErrorMessage("Invalid credentials. Please try again.");
            setIsError(true);
            setProcessing(false);
            onOpen();
        }
    };

    let isInvalid = false;

    useEffect(() => {
        if (session && !isOpen) {
            if (redirectTimer > 0) {
                const timer = setTimeout(() => {
                    setRedirectTimer(redirectTimer - 1);
                }, 1000);
                return () => clearTimeout(timer);
            } else {
                router.replace('/');
                router.refresh();
            }
        } else if (session && isOpen) {
            if (redirectTimer > 0) {
                const timer = setTimeout(() => {
                    setRedirectTimer(redirectTimer - 1);
                }, 1000);
                return () => clearTimeout(timer);
            } else {
                router.back();
                router.refresh();
            }
        }

    }, [isOpen, redirectTimer, router, session]);

    return (
        <>
            {status === 'authenticated' && !isOpen ? (
                <Card className="w-full max-w-md p-8 gap-5">
                    <h1 className="text-3xl">Log In</h1>
                    <p>You are logged in.</p>
                    <p>Redirecting to home in {redirectTimer} seconds</p>
                    <Button
                        fullWidth
                        type="submit"
                        color="secondary"
                        onClick={() => {
                            router.push('/profile');
                            router.refresh();
                        }}
                    >Go To Profile
                    </Button>
                </Card>
            ) : (
                <>
                    <Card className="w-full max-w-md p-8">
                        <h1 className="text-3xl">Log In</h1>

                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Input
                                type="email"
                                label="Email or Phone Number"
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
                                type={showPassword ? "text" : "password"}
                                label="Password"
                                name="password"
                                placeholder={showPassword ? "password" : "********"}
                                labelPlacement="outside"
                                startContent={<PasswordIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                endContent={<ShowHidePassword onClick={setShowPassword} />}
                                fullWidth
                                isRequired
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                fullWidth
                                isDisabled={processing}
                                type="submit"
                                isLoading={processing}
                            >
                                {processing ? "Logging In" : "Log In"}
                            </Button>
                            <p className="text-center text-small">
                                Don&apos;t have an account?{" "}
                                <Link size="sm" href="/login">
                                    Sign Up
                                </Link>
                            </p>
                        </form>
                    </Card>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Log In {isError ? "Failed" : "Successful"}</ModalHeader>
                                    <ModalBody>
                                        {isError ? (
                                            <p className="text-red-500">{errorMessage}</p>
                                        ) : (
                                            <>
                                                <p>
                                                    You have been successfully logged in.
                                                </p>
                                                <p>
                                                    Redirecting in {redirectTimer} seconds.
                                                </p>
                                            </>
                                        )}
                                    </ModalBody>
                                    <ModalFooter>
                                        <Button color="danger" variant="light" onPress={() => {
                                            onClose();
                                            router.replace('/');
                                            router.refresh();
                                        }}>
                                            Go Home
                                        </Button>
                                        <Button color="primary" onPress={() => {
                                            if (isError) {
                                                onClose();
                                            } else {
                                                onClose();
                                                router.replace('/profile');
                                                router.refresh();
                                            }
                                        }}>
                                            {isError ? "Try Again" : "Profile"}
                                        </Button>
                                    </ModalFooter>
                                </>
                            )}
                        </ModalContent>
                    </Modal>
                </>
            )}
        </>
    );
}
