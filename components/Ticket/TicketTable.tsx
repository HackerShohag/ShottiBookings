'use client';

import React from 'react';
import { downloadAsPdf } from '@/components/Ticket/DowloadPDF';
import { Button, Card, CardBody, CardFooter, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

export interface Passenger {
    name: string;
    gender: string;
    seatNo: string;
    noviceNo: string;
    from: string;
    to: string;
    busTime: string;
    mobileNo: string;
}

interface Props {
    passengers: Passenger[];
}

const Ticket: React.FC<Props> = ({ passengers }) => {
    const componentID = 'my-table';
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().slice(0, 10);
    const currentTime = currentDate.toLocaleTimeString().replace(/:/g, '-');
    const outputFile = `ticket_${formattedDate}_${currentTime.replace(/ /g, '_')}.pdf`;

    return (
        <Card>
            <CardBody>
                <Table aria-label="Example static collection table" id={componentID}>
                    <TableHeader>
                        <TableColumn>Passenger Name</TableColumn>
                        <TableColumn>Gender</TableColumn>
                        <TableColumn>Seat No</TableColumn>
                        <TableColumn>Invoice No</TableColumn>
                        <TableColumn>From</TableColumn>
                        <TableColumn>To</TableColumn>
                        <TableColumn>Bus Time</TableColumn>
                        <TableColumn>Mobile No</TableColumn>
                    </TableHeader>
                    <TableBody>
                        {passengers.map((passenger, index) => (
                            <TableRow key={index}>
                                <TableCell>{passenger.name}</TableCell>
                                <TableCell>{passenger.gender}</TableCell>
                                <TableCell>{passenger.seatNo}</TableCell>
                                <TableCell>{passenger.noviceNo}</TableCell>
                                <TableCell>{passenger.from}</TableCell>
                                <TableCell>{passenger.to}</TableCell>
                                <TableCell>{passenger.busTime}</TableCell>
                                <TableCell>{passenger.mobileNo}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardBody>
            <CardFooter style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button onClick={() => downloadAsPdf(componentID, outputFile)}>Download as PDF</Button>
            </CardFooter>
        </Card>
    );
};

export default Ticket;
