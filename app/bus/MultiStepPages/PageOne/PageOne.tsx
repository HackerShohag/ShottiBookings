import React from 'react';
import Image from 'next/image';
import { BorderContainer } from '@/components/Containers/Containers';
import '@/components/BookingForm/BookingForm.css';

import busImg from '@/public/assets/bus.png';
// import '@/components/BookingForm/BookingForm.css';
import { BasicForm } from '@/components/BookingForm/BasicForm'

export interface PageOneProps {
  onButtonClick: (() => void) | undefined;
}

const PageOne = ({ onButtonClick }: PageOneProps) => {
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

export default PageOne;
