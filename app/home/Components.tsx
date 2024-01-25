'use client';

import Image from 'next/image';
import { SolidContainer } from '@/components/Containers/Containers';
import { useRouter } from 'next/navigation';

const busLogo = require('@/public/assets/bus-logo.jpg');
const trainLogo = require('@/public/assets/train-logo.jpg');
const hotelLogo = require('@/public/assets/hotel-logo.png');

const serviceContainerStyle = {
    height: '300px',
    width: '250px',
};

export function BusComponent() {
    const router = useRouter();

    return (
        <SolidContainer className='clickable'>
            <div className='logo-container' onClick={() => {
                router.push('/bus');
            }}
            >
                <Image className='logo-image' src={busLogo} alt='Bus Image' />
                <h2 className='m-2'>Bus Ticket Booking</h2>
            </div>
        </SolidContainer>
    )
}
export function HotelComponent() {
    return (
        <SolidContainer className='clickable'>
            <div className="logo-container" onClick={() => { alert("This service is coming soon!") }}>
                <Image className="logo-image" src={hotelLogo} alt="Hotel Logo" />
                <h2 className='m-2'>Hotel Booking</h2>
                <div className="coming-soon">Coming Soon</div>
            </div>
        </SolidContainer>
    )
}

export function TrainComponent() {
    return (
        <SolidContainer className='clickable'>
            <div className="logo-container" onClick={() => { alert("This service is coming soon!") }}>
                <Image className="logo-image" src={trainLogo} alt="Train Logo" />
                <h2 className='m-2'>Train Ticket Booking</h2>
                <div className="coming-soon">Coming Soon</div>
            </div>
        </SolidContainer>
    )
}