import { CompanyLogo } from '@/components/Logo/Logo';
import { BusComponent, HotelComponent, TrainComponent } from './Components';

import './home.css';
import { SolidContainer } from '@/components/Containers/Containers';

function Home() {

    return (
        <div className='logo-container inset-0'>
            <h1 className='text-white text-4xl font-bold  mb-10'>Welcome to Shotti Bookings</h1>
            <div className="container-wrapper">
                <BusComponent />
                <HotelComponent />
                <TrainComponent />
            </div>
            <SolidContainer className='flex flex-col w-full mt-10'>
                <h1 className='text-4xl font-bold  mb-10'>Some Company Branding</h1>
            </SolidContainer>
        </div>
    );
}

export default Home;
