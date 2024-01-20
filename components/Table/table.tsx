import {
  Button,
  Card,
  CardBody,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { siteConfig } from '@/config/site';
import { useSession } from 'next-auth/react';

import { RenderCell, AdminProps } from "./render-cell";
import UserDetails from "./UserDetails";
import UserDetailsEdit from "./UserDetailsEdit";

export const TableWrapper = () => {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [admins, setAdmins] = useState<AdminProps[]>([]);
  const [adminId, setAdminId] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [processing, setProcessing] = useState(false);
  const [editProcessing, setEditProcessing] = useState(false);

  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'EMAIL & ADDRESS', uid: 'email' },
    { name: 'TYPE', uid: 'role' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ]

  const handlers = {
    onDetails: (id: string) => {
      setAdminId(id.replace('A-', ''));
      setIsEditing(false);
      onOpen();
    },
    onEdit: (id: string) => {
      setAdminId(id.replace('A-', ''));
      setIsEditing(true);
      onOpen();
    },
    onDelete: (id: string) => {
      setIsEditing(false);
      // Handle delete logic here
    }
  };

  const updateAdmin = (adminData: AdminProps) => {
    setEditProcessing(true);
    const response = fetch(siteConfig.backendServer.address + '/user/update-admin', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "" + session?.accessToken
      },
      body: JSON.stringify(adminData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setEditProcessing(false);
        return true;
      })
      .catch(err => {
        console.log(err);
        setEditProcessing(false);
        return false;
      })
    return false;
  };

  useEffect(() => {
    setProcessing(true);
    const response = fetch(siteConfig.backendServer.address + '/user/get-admins', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "" + session?.accessToken
      }
    })
      .then(response => response.json())
      .then(data => {
        setAdmins(data?.data);
        setProcessing(false);
      })
      .catch(err => console.log(err))
  }, [session?.accessToken])



  return (
    <>
      <Card className=" w-full flex flex-col gap-4">
        {
          processing ? (
            <CardBody className="flex justify-center items-center">
              <Spinner className="m-20" size="lg" />
            </CardBody>
          ) : (
            <Table aria-label="Example table with custom cells">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn
                    key={column.uid}
                    align={column.uid === "actions" ? "center" : "start"}
                  >
                    {column.name}
                  </TableColumn>
                )}
              </TableHeader>
              <TableBody items={admins}>
                {(item) => (
                  <TableRow>
                    {(columnKey) => (
                      <TableCell>
                        {RenderCell({ user: item, columnKey: columnKey, handlers: handlers })}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          )
        }
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Admin Details</ModalHeader>
              <ModalBody>
                {
                  editProcessing ? (
                    <div className="flex justify-center items-center">
                      <Spinner className="m-20" size="lg" />
                    </div>
                  ) : isEditing ? (
                    <UserDetailsEdit adminProps={admins.at(Number(adminId) - 1)} onSubmit={updateAdmin} />
                  ) : (
                    <UserDetails adminProps={admins.at(Number(adminId) - 1)} />
                  )
                }
              </ModalBody>
              <ModalFooter>
                {
                  isEditing ? (
                    null
                  ) : (
                    <Button color="danger" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  )
                }
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
