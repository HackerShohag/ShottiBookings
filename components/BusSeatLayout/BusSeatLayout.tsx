'use client';

import React, { useEffect, useState } from 'react';
import './BusSeatLayout.css';
import { Button } from '@nextui-org/button';

export interface SeatProps {
    seatNumber: string;
    status?: 'available' | 'occupied' | 'selected';
    onSelect: () => void;
}

const Seat: React.FC<SeatProps> = ({ seatNumber, status, onSelect }) => {
    return (
        <button
            className={`seat rounded ${status}`}
            disabled={status === 'occupied'}
            onClick={onSelect}
        >
            {seatNumber}
        </button>
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
    setSeatsButton: (seats: string[]) => void;
}

const SeatLayout: React.FC<SeatLayoutProps> = (props) => {
    const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const handleSeatSelect = (seatNumber: string) => {
        setErrorMessage('');
        setSelectedSeats((prevSelectedSeats) => {
            if (prevSelectedSeats.includes(seatNumber)) {
                return prevSelectedSeats.filter((seat) => seat !== seatNumber);
            } else {
                if (prevSelectedSeats.length < 6) {
                    return [...prevSelectedSeats, seatNumber];
                } else {
                    setErrorMessage('You can select maximum 6 seats');
                    return prevSelectedSeats;
                }
            }
        });
    };

    useEffect(() => {
        props.setSeatsButton(selectedSeats);
    }, [props, selectedSeats]);

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
                seats.push(<BlankSeat key={`blank-${col}`} />);
            }
        }

        for (let row = 1; row <= rows; row++) {
            for (let col = 1; col <= columns; col++) {
                if (col === 3) {
                    seats.push(<BlankSeat key={`blank-${row + col + 10}`} />);
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

            const seatNumber = `${String.fromCharCode(64 + col)}${rows + 1}`;
            const status = selectedSeats.includes(seatNumber) ? 'selected' : 'available';

            seats.push(<Seat
                key={seatNumber}
                seatNumber={seatNumber}
                status={status}
                onSelect={() => handleSeatSelect(seatNumber)}
            />);
        }

        return seats;
    };

    return (
        <div className="row" style={{ width: props.width }}>
            {errorMessage && <div className="error-message text-red-600">{errorMessage}</div>}
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
            <div className='flex column justify-center items-center'>
                <div className='bus-seat-layout'>
                    {renderSeats()}
                </div>
            </div>
        </div>
    );
};

export default SeatLayout;
