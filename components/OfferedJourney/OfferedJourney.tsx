import React from 'react';
import Image from 'next/image';

import './OfferedJourney.css';

interface BusProps {
    companyName: string;
    no: string;
    capacity: number;
}

interface DriverProps {
    id: string;
    name: string;
    email: string;
    contactNo: number;
}

export interface OfferedJourneyProps {
    driver: DriverProps;
    bus: BusProps;
    date: string;
    startTime: string;
    endTime: string;
    capacity: number;
    slots: Array<string>;
}

const OfferedJourney: React.FC<OfferedJourneyProps> = (props) => {
    return (
        <div className="info-row">
            <div className="column">
                <Image alt="Bus Image" className="bus-image" src={''} />
            </div>
            <div className="column bus-info">
                <h3>Bus Name: {props.bus.companyName}</h3>
                <p>Route: {props.bus.no}</p>
                <p>Departure Time: {props.startTime}</p>
            </div>
            <div className="column payment-info">
                {/* <p>Fare: {props.slots}</p> */}
                <p>Seat Availability: {props.capacity}</p>
                <p>Expected End Time: {props.endTime} </p>
            </div>
        </div>
    );
};

export default OfferedJourney;