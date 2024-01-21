import React from 'react';
import Image from 'next/image';
import { FormData } from '@/types';
import { BorderContainer } from '@/components/Containers/Containers';
import '@/components/BookingForm/BookingForm.css';

import busImg from '@/public/assets/bus.png';
import { BasicForm } from '@/components/BookingForm/BasicForm'
import { Spinner } from '@nextui-org/react';

export interface PageOneProps {
  formData: FormData;
  routes: string[];
  processing: boolean;
  handleDataAvialblity: (f: boolean) => void;
  handleChange: ((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) | undefined;
}

const PageOne = ({ handleChange, routes, formData, processing, handleDataAvialblity }: PageOneProps) => {
  return (
    <BorderContainer>
      {
        processing ? (
          <Spinner size='lg' />
        ) : (
          <>
            <h2>Bus Ticket Booking Service</h2>
            <div className='row-container'>
              <BasicForm routes={routes} formData={formData} handleChange={handleChange} handleDataAvialblity={handleDataAvialblity} />
              <Image src={busImg} alt="Image" />
            </div>
          </>
        )}
    </BorderContainer>
  )
}

export default PageOne;
