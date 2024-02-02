// BusInfo.tsx
import React from 'react';
import './BusInfo.css';
import { Button, Card, CardBody } from '@nextui-org/react';
import { CompanyLogo } from '../icons';


interface BusInfoProps {
    name: string;
    id: string;
    seatAvailability: number;
    departureTime: string;
    image: string;
    fare: number;
    isAC?: boolean;
    onButtonClick?: (() => void) | undefined;
}

const BusInfo: React.FC<BusInfoProps> = (props) => {
    return (
        <Card className="flex bg-gray-600 mt-2 mb-2">
            <CardBody className='flex flex-row'>
                <div className="column text-nowrap">
                    <CompanyLogo className="w-10 h-10" />
                    <h3>Name: {props.name}</h3>
                    <p className='text-nowrap'>Time: {props.departureTime}</p>
                </div>
                <div className="">
                    <p>{props.isAC ? 'AC' : 'Non-AC'}</p>
                    <p>Fare: {props.fare} TK</p>
                    <Button className="book-button" onClick={() => props.onButtonClick && props.onButtonClick()}>Book Now</Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default BusInfo;