'use client';

import Image from 'next/image';
import { TransparentContainer } from '@/components/Containers/Containers';
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
        <TransparentContainer className='clickable bg-transparent backdrop-blur-none'>
            <div className='logo-container' onClick={() => {
                router.push('/bus');
            }}
            >
                <Image className='logo-image' src={busLogo} alt='Bus Image' />
                <h2 className='m-2 text-green-500 text-lg font-semibold'>Bus Ticket Booking</h2>
            </div>
        </TransparentContainer>
    )
}
export function HotelComponent() {
    return (
        <TransparentContainer className='clickable bg-transparent backdrop-blur-none'>
            <div className="logo-container" onClick={() => { alert("This service is coming soon!") }}>
                <Image className="logo-image" src={hotelLogo} alt="Hotel Logo" />
                <h2 className='m-2 text-lg font-semibold text-red-500'>Hotel Booking</h2>
                <div className="coming-soon text-2xl font-semibold text-pink-300">Coming Soon</div>
            </div>
        </TransparentContainer>
    )
}

export function TrainComponent() {
    return (
        <TransparentContainer className='clickable bg-transparent backdrop-blur-none'>
            <div className="logo-container" onClick={() => { alert("This service is coming soon!") }}>
                <Image className="logo-image" src={trainLogo} alt="Train Logo" />
                <h2 className='m-2 text-lg font-semibold text-green-500'>Train Ticket Booking</h2>
                <div className="coming-soon text-2xl font-semibold text-pink-300">Coming Soon</div>
            </div>
        </TransparentContainer>
    )
}