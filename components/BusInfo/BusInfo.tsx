// BusInfo.tsx
import React from 'react';
import './BusInfo.css';
import { Button, Card, CardBody } from '@nextui-org/react';


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
        <Card className="flex bg-gray-600 m-3">
            <CardBody>
                <div className="flex row items-center">
                    <div className="column">
                        <h3>Name: {props.name}</h3>
                        <p>Time: {props.departureTime}</p>
                    </div>
                    <div className="column">
                        <p>{props.isAC ? 'AC' : 'Non-AC'}</p>
                        <p>Fare: {props.fare}</p>
                        <Button className="book-button" onClick={() => props.onButtonClick && props.onButtonClick()}>Book Now</Button>
                    </div>
                </div>
            </CardBody>
        </Card>
    );
};

export default BusInfo;