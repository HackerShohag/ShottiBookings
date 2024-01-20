'use client';

import React, { useState, useEffect, FormEvent } from "react";
import { Input, Button, Card, Select, SelectItem, Link, useDisclosure, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Spinner } from "@nextui-org/react";
import { MailIcon, PasswordIcon, LoadingIcon } from '@/app/login/Icons'
import { useRouter } from 'next/navigation';
import { SelectorIcon, UserIcon, PhoneIcon, GenderIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useSession } from "next-auth/react";

export interface RegisterFormData {
    password: string;
    user: {
        name: string;
        email: string;
        contactNo: string;
        gender: string;
        isDeleted: boolean;
    };
}

export default function RegisterForm() {
    const router = useRouter();
    const { data: session, status } = useSession();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contactNumber, setContactNumber] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [contactNumberError, setContactNumberError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [genderError, setGenderError] = useState("");

    const [nameFocusChanged, setNameFocusChanged] = useState(false);
    const [emailFocusChanged, setEmailFocusChanged] = useState(false);
    const [cNumberFocusChanged, setCNumberFocusChanged] = useState(false);
    const [genderFocusChanged, setGenderFocusChanged] = useState(false);
    const [passwordFocusChanged, setPasswordFocusChanged] = useState(false);
    const [confirmPasswordFocusChanged, setConfirmPasswordFocusChanged] = useState(false);

    const [processing, setProcessing] = useState(false);
    const [redirectTimer, setRedirectTimer] = useState(5);
    const [errorMessage, setErrorMessage] = useState("");
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const phoneRegex = /^01\d{9}$/;
        let isValid = true;

        if (nameFocusChanged) {
            if (name.trim() === "") {
                setNameError("Please enter your name");
                isValid = false;
            } else {
                setNameError("");
            }
        }

        if (emailFocusChanged) {
            if (email.trim() === "") {
                setEmailError("Please enter your email");
                isValid = false;
            } else if (!emailRegex.test(email)) {
                setEmailError("Please enter a valid email address");
                isValid = false;
            } else {
                setEmailError("");
            }
        }

        if (cNumberFocusChanged) {
            if (contactNumber.trim() === "") {
                setContactNumberError("Please enter your contact number");
                isValid = false;
            } else if (!phoneRegex.test(contactNumber)) {
                setContactNumberError("Please enter a valid phone number");
                isValid = false;
            } else {
                setContactNumberError("");
            }
        }

        if (genderFocusChanged) {
            if (gender.trim() === "") {
                setGenderError("Please select your gender");
                isValid = false;
            } else {
                setGenderError("");
            }
        }

        if (passwordFocusChanged) {
            if (password.trim() === "") {
                setPasswordError("Please enter your password");
                isValid = false;
            } else if (password.length < 8) {
                setPasswordError("Password must be at least 8 characters long");
                isValid = false;
            } else if (!/\d/.test(password)) {
                setPasswordError("Password must contain at least one digit");
                isValid = false;
            } else if (!/[a-z]/.test(password)) {
                setPasswordError("Password must contain at least one lowercase letter");
                isValid = false;
            } else if (!/[A-Z]/.test(password)) {
                setPasswordError("Password must contain at least one uppercase letter");
                isValid = false;
            } else if (!/[!@#$%^&*()]/.test(password)) {
                setPasswordError("Password must contain at least one special character");
                isValid = false;
            } else {
                setPasswordError("");
            }
        }

        if (confirmPasswordFocusChanged) {
            if (password !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match");
                isValid = false;
            } else {
                setConfirmPasswordError("");
            }
        }
    }, [name, email, contactNumber, password, confirmPassword, gender, nameFocusChanged, emailFocusChanged, cNumberFocusChanged, genderFocusChanged, passwordFocusChanged, confirmPasswordFocusChanged]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setProcessing(true);

        if (nameError || emailError || contactNumberError || passwordError || confirmPasswordError) {
            return;
        }

        const data: RegisterFormData = {
            password: password,
            user: {
                name: name,
                email: email,
                contactNo: contactNumber,
                gender: gender,
                isDeleted: false,
            }
        }
        const response = await fetch(siteConfig.backendServer.address + '/user/create-customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        console.log(response);

        if (response?.ok) {
            setIsError(false);
            setProcessing(false);
            onOpen();
        } else {
            setErrorMessage("Registration failed. Please try again.");
            setIsError(true);
            setProcessing(false);
        }
    };

    let isInvalid = false;

    useEffect(() => {
        if (session) {
            if (redirectTimer > 0) {
                const timer = setTimeout(() => {
                    setRedirectTimer(redirectTimer - 1);
                }, 1000);
                return () => clearTimeout(timer);
            } else {
                router.push('/');
                router.refresh();
            }
        }
    }, [redirectTimer, router, session]);


    return (
        <>
            {status === 'authenticated' ? (
                <Card className="w-full max-w-md p-8 gap-5 p-8">
                    <h1 className="text-3xl">Register</h1>
                    <p>You are already logged in.</p>
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
                    <Card aria-errormessage="Registration Failed!" className="w-full max-w-xl p-8">
                        <h1 className="text-3xl">Register</h1>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Input
                                type="text"
                                label="Name:"
                                name="name"
                                placeholder="Full Name"
                                labelPlacement="outside"
                                isInvalid={isInvalid}
                                errorMessage={nameError}
                                startContent={
                                    <UserIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                fullWidth
                                isRequired
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                onFocusChange={() => setNameFocusChanged(true)}
                            />
                            <Input
                                type="email"
                                label="Email:"
                                name="email"
                                placeholder="you@example.com"
                                labelPlacement="outside"
                                isInvalid={isInvalid}
                                errorMessage={emailError}
                                startContent={
                                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                fullWidth
                                isRequired
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocusChange={() => setEmailFocusChanged(true)}
                            />

                            <Input
                                type="text"
                                label="Phone Number:"
                                name="contactNumber"
                                placeholder="017XXXXXXXX"
                                labelPlacement="outside"
                                isInvalid={isInvalid}
                                errorMessage={contactNumberError}
                                startContent={
                                    <PhoneIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                fullWidth
                                isRequired
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                                onFocusChange={() => setCNumberFocusChanged(true)}
                            />

                            <Select
                                label="Gender:"
                                placeholder="Select Gender:"
                                className="max-w-xs"
                                labelPlacement="outside-left"
                                disableSelectorIconRotation
                                selectorIcon={<SelectorIcon />}
                                isRequired
                                fullWidth
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                                onFocusChange={() => setGenderFocusChanged(true)}
                                errorMessage={genderError}
                                startContent={<GenderIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                            >
                                <SelectItem key='male' value='male'>
                                    Male
                                </SelectItem>
                                <SelectItem key='female' value='female'>
                                    Female
                                </SelectItem>
                                <SelectItem key='others' value='others'>
                                    Others
                                </SelectItem>
                            </Select>

                            <Input
                                type="password"
                                label="Password:"
                                name="password"
                                placeholder="********"
                                labelPlacement="outside"
                                isInvalid={isInvalid}
                                errorMessage={passwordError}
                                startContent={
                                    <PasswordIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                fullWidth
                                isRequired
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onFocusChange={() => setPasswordFocusChanged(true)}
                            />
                            <Input
                                type="password"
                                label="Confirm Password:"
                                name="confirmPassword"
                                placeholder="********"
                                labelPlacement="outside"
                                isInvalid={isInvalid}
                                errorMessage={confirmPasswordError} // Added confirm password error message
                                startContent={
                                    <PasswordIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                                }
                                fullWidth
                                isRequired
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                onFocusChange={() => setConfirmPasswordFocusChanged(true)}
                            />
                            <Button
                                fullWidth
                                type="submit"
                                isDisabled={processing}
                                color="secondary"
                                spinner={<LoadingIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />}
                                isLoading={processing}
                            >
                                {processing ?
                                    "Registering" : "Register"
                                }
                            </Button>
                            <p className="text-center text-small">
                                Already have an account?{" "}
                                <Link size="sm" href="/login">
                                    Log In
                                </Link>
                            </p>
                        </form>
                    </Card>
                    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                        <ModalContent>
                            {(onClose) => (
                                <>
                                    <ModalHeader className="flex flex-col gap-1">Registration {isError ? "Failed" : "Successful"}</ModalHeader>
                                    <ModalBody>
                                        {isError ? (
                                            <p className="text-red-500">{errorMessage}</p>
                                        ) : (
                                            <p>
                                                You have been successfully registered.
                                            </p>
                                        )}
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
                                            if (isError) {
                                                onClose();
                                            } else {
                                                onClose();
                                                router.push('/login');
                                                router.refresh();
                                            }
                                        }}>
                                            {isError ? "Try Again" : "Log In"}
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
