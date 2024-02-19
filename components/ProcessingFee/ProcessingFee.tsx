import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';

interface Seat {
    seatNumber: string;
    cost: number;
}

interface ProcessingFeeProps {
    seats: string[];
    cost: number;
}

const ProcessingFee: React.FC<ProcessingFeeProps> = ({ seats, cost }) => {
    const subtotal = seats.length * cost;
    const processingFee = seats.length * 40;

    const fee = subtotal + processingFee;

    const processingFeeObj: Seat[] = seats.map((seat) => ({
        seatNumber: seat,
        cost: cost,
    }));

    processingFeeObj.push({ seatNumber: 'Subtotal', cost: subtotal });
    processingFeeObj.push({
        seatNumber: 'Processing Fee (40 x ' + seats.length + ')',
        cost: processingFee,
    });
    processingFeeObj.push({ seatNumber: 'Total', cost: fee });


    return (
        <Table aria-label="Processing Fee Table">
            <TableHeader>
                <TableColumn className='text-black dark:text-white text-lg'>Seat Number</TableColumn>
                <TableColumn className='text-black dark:text-white text-lg'>Cost</TableColumn>
            </TableHeader>
            <TableBody>
                {processingFeeObj.map((seat) => (
                    <TableRow key={seat.seatNumber}>
                        <TableCell className={seat.seatNumber === 'Total' ? 'font-bold text-md text-black dark:text-white' : ''}>{seat.seatNumber}</TableCell>
                        <TableCell className={seat.seatNumber === 'Total' ? 'font-bold text-md text-black dark:text-white' : ''}>{seat.cost}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ProcessingFee;
