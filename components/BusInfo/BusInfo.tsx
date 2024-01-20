// BusInfo.tsx
import React from 'react';
import Image from 'next/image';
import './BusInfo.css';
import { Button, Card, CardBody } from '@nextui-org/react';


interface BusInfoProps {
    name: string;
    id: string;
    seatAvailability: number;
    departureTime: string;
    image: string;
    route: string;
    fare: number;
    isAC?: boolean;
    onButtonClick?: (() => void) | undefined;
}

const BusInfo: React.FC<BusInfoProps> = (props) => {
    return (
        <Card className="flex bg-gray-600 m-3">
            <CardBody>
                <div className="flex row items-center">
                    <div className="column">
                        <Image src={props.image} alt="Bus Image" className="bus-image" />
                        <p className='flex justify-center'>{props.isAC ? 'AC' : 'Non-AC'}</p>
                    </div>
                    <div className="column">
                        <h3>Bus Name: {props.name}</h3>
                        <p>Bus ID: {props.id}</p>
                        <p>Route: {props.route}</p>
                        <p>Departure Time: {props.departureTime}</p>
                    </div>
                    <div className="column">
                        <p>Fare: {props.fare}</p>
                        <p>Seat Availability: {props.seatAvailability}</p>
                        <Button className="book-button" onClick={() => props.onButtonClick && props.onButtonClick()}>Book Now</Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default BusInfo;