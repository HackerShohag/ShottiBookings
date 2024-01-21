import {
  Button,
  Card,
  CardBody,
  CardHeader,
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

import { RenderCell, UserProps } from "./render-cell";
import UserDetails from "./UserDetails";
import UserDetailsEdit from "./UserDetailsEdit";

interface AccountsProps {
  userType: string;
}

export const TableWrapper = (props: AccountsProps) => {
  const { data: session, status } = useSession();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const [users, setUsers] = useState<UserProps[]>([]);
  const [userId, setUserId] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [processing, setProcessing] = useState(false);
  const [editProcessing, setEditProcessing] = useState(false);
  const [noUserFound, setNoUserFound] = useState(false);

  const userTypeReplace = {
    admins: "A",
    operators: "O",
    drivers: "D",
    customers: "C",
    bus: "B",
    offeredJourney: "J",
  }[props.userType] || "C";

  const columns = [
    { name: 'NAME', uid: 'name' },
    { name: 'EMAIL & ADDRESS', uid: 'email' },
    { name: 'TYPE', uid: 'role' },
    { name: 'STATUS', uid: 'status' },
    { name: 'ACTIONS', uid: 'actions' },
  ]

  const handlers = {
    onDetails: (id: string) => {
      setUserId(id.replace(userTypeReplace + '-', ''));
      setIsEditing(false);
      onOpen();
    },
    onEdit: (id: string) => {
      setUserId(id.replace(userTypeReplace + '-', ''));
      setIsEditing(true);
      onOpen();
    },
    onDelete: (id: string) => {
      setIsEditing(false);
      // Handle delete logic here
    }
  };

  const updateUser = (userData: UserProps) => {
    setEditProcessing(true);
    const response = fetch(siteConfig.backendServer.address + '/user/update-' + props.userType, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": "" + session?.accessToken
      },
      body: JSON.stringify(userData)
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
    const response = fetch(siteConfig.backendServer.address + '/user/get-' + props.userType, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "" + session?.accessToken
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data?.data?.length > 0) {
          setUsers(data?.data);
          setNoUserFound(false);
        } else {
          setNoUserFound(true);
        }
        setProcessing(false);
      })
      .catch(err => console.log(err))
  }, [props.userType, session?.accessToken])

  return (
    <>
      <Card className=" w-full flex flex-col gap-4">
        {
          processing ? (
            <CardBody className="flex justify-center items-center">
              <Spinner className="m-20" size="lg" />
            </CardBody>
          ) : (
            <>
              {noUserFound ? (
                <CardBody className="flex justify-center items-center">
                  <CardHeader className="flex justify-center items-center" style={{ color: 'red' }}>
                    <h3 className="text-xl font-semibold">No {props.userType.charAt(0).toUpperCase() + props.userType.slice(1)}s Found</h3>
                  </CardHeader>
                  <div className="flex flex-col gap-4 items-center">
                    <p>
                      This could be because there are no {props.userType}s registered yet.
                      <br />
                      or there is some error in fetching the data from database.
                    </p>
                  </div>
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
                  <TableBody items={users}>
                    {(item) => (
                      <TableRow>
                        {(columnKey) => (
                          <TableCell>
                            {RenderCell({ user: item, columnKey: columnKey, handlers: handlers, userType: props.userType })}
                          </TableCell>
                        )}
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              )}
            </>
          )
        }
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{props.userType.charAt(0).toUpperCase() + props.userType.slice(1)} Details</ModalHeader>
              <ModalBody>
                {
                  editProcessing ? (
                    <div className="flex justify-center items-center">
                      <Spinner className="m-20" size="lg" />
                    </div>
                  ) : isEditing ? (
                    <UserDetailsEdit userProps={users.at(Number(userId) - 1)} onSubmit={updateUser} />
                  ) : (
                    <UserDetails userProps={users.at(Number(userId) - 1)} />
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
