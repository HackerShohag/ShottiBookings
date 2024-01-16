'use client';

import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Link } from "@nextui-org/react";
import { signOut } from 'next-auth/react';

const LogOutPage = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <>
            <Button
                className="text-sm font-normal text-default-600 bg-default-100"
                onClick={onOpen}
                variant="flat"
            >
                Log Out
            </Button>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Confirm Log Out</ModalHeader>
                            <ModalBody>
                                <p>
                                    Do you really want to log out?
                                </p>
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onPress={onClose}>
                                    No
                                </Button>
                                <Button color="primary" onPress={() => {
                                    onClose();
                                    signOut();
                                }}>
                                    Yes
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
};

export default LogOutPage;


export const LogOutButton = () => {
    return (
        <Button
            className="text-sm font-normal text-default-600 bg-default-100"
            onClick={() => {
                signOut();
            }}
            variant="flat"
        >
            Log Out
        </Button>
    );
};