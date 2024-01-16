import React from 'react';
import Image from 'next/image';
import { BorderContainer } from '@/components/Containers/Containers';

import busImg from '@/public/assets/bus.png';
import './BookingForm.css';
import { BasicForm } from './BasicForm';

export interface City {
    id: string;
    source: string;
    destinations: string[];
}

export interface FormData {
    origin: string;
    destination: string;
    date: string;
    numberOfTickets: number;
}

export interface BasicFormProps {
    onButtonClick: (() => void) | undefined;
}

function BookingForm({ onButtonClick }: BasicFormProps) {
    return (
        <BorderContainer>
            <h2>Bus Ticket Booking Service</h2>
            <div className='row-container'>
                <BasicForm onButtonClick={onButtonClick} />
                <Image src={busImg} alt="Image" />
            </div>
        </BorderContainer>
    )
}

export default BookingForm;