'use client';

import React, { useState } from 'react';
import './BusSeatLayout.css'; // Import your CSS file for styling
import { Button } from '@nextui-org/button';

export interface SeatProps {
    seatNumber: string;
    status?: 'available' | 'occupied' | 'selected';
    onSelect: () => void;
}

const Seat: React.FC<SeatProps> = ({ seatNumber, status, onSelect }) => {
    return (
        <Button
            className={`seat ${status}`}
            isDisabled={status === 'occupied'}
            onClick={onSelect}
        >
            {seatNumber}
        </Button>
    );
};

const BlankSeat = () => {
    return (
        <div
            className={`blank-seat`}
        >
        </div>
    );
};

interface SeatLayoutProps {
    width?: string;
    ticketStatus: {
        available: string;
        booked: string;
        occupied: string;
    };
}

const SeatLayout: React.FC<SeatLayoutProps> = (props) => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);

    const handleSeatSelect = (seatNumber: string) => {
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatNumber)) {
                // Deselect the seat if already selected
                return prevSelectedSeats.filter((seat) => seat !== seatNumber);
            } else {
                // Select the seat if not selected
                return [...prevSelectedSeats, seatNumber];
            }
        });
    };

    // Assuming a 9x5 grid layout with a blank column
    const rows = 9;
    const columns = 5;

    const renderSeats = () => {
        const seats = [];
        let skip = 0;

        for (let col = 1; col <= columns; col++) {
            if (col === 5) {
                seats.push(<Seat
                    key={`driver-seat`}
                    seatNumber={`Driver`}
                    status={'occupied'}
                    onSelect={() => handleSeatSelect(`Driver`)}
                />);
            } else {
                seats.push(<BlankSeat />);
            }
        }

        for (let row = 1; row <= rows; row++) {
            for (let col = 1; col <= columns; col++) {
                // Skip rendering seats in the blank column
                if (col === 3) {
                    seats.push(<BlankSeat key={`blank-${row}`} />);
                    continue;
                }

                if (col > 3) {
                    skip = 1;
                } else {
                    skip = 0;
                }

                const seatNumber = `${String.fromCharCode(64 + col - skip)}${row}`;
                const status = selectedSeats.includes(seatNumber) ? 'selected' : 'available';

                seats.push(
                    <Seat
                        key={seatNumber}
                        seatNumber={seatNumber}
                        status={status}
                        onSelect={() => handleSeatSelect(seatNumber)}
                    />
                );
            }
        }

        for (let col = 1; col <= columns; col++) {
            seats.push(<BlankSeat />);
        }

        return seats;
    };

    return (
        <div className="row" style={{ width: props.width }}>
            <div className='flex column justify-center items-center'>

                <div className='bus-seat-layout'>
                    {renderSeats()}
                </div>
            </div>
            <div className="flex row m-3 justify-between items-center">
                <div className="seat-legend">
                    <Button isDisabled className="seat available" ></Button>
                    <span className='flex justify-center'>{props.ticketStatus.available}</span>
                </div>
                <div className="seat-legend">
                    <Button isDisabled className="seat selected"></Button>
                    <span className='flex justify-center'>{props.ticketStatus.booked}</span>
                </div>
                <div className="seat-legend">
                    <Button isDisabled className="seat occupied" ></Button>
                    <span className='flex justify-center'>{props.ticketStatus.occupied}</span>
                </div>
            </div>
        </div>
    );
};

export default SeatLayout;
