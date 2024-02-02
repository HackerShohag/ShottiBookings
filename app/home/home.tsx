import { BusComponent, HotelComponent, TrainComponent } from './Components';

import './home.css';
import { SolidContainer } from '@/components/Containers/Containers';

function Home() {

    return (
        <div className='logo-container inset-0'>
            <h1 className='text-white text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold mb-5'>Welcome to Shotti Bookings</h1>
            <div className="container-wrapper">
                <BusComponent />
                <HotelComponent />
                <TrainComponent />
            </div>
            <SolidContainer className='flex flex-col w-full mt-10 mt-20' height='300px'>
                <h1 className='text-white text-xl font-bold mb-10 sm:text-4xl'>Some Company Branding</h1>
            </SolidContainer>
        </div>
    );
}

export default Home;
