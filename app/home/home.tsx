import { CompanyLogo } from '@/components/Logo/Logo';
import { BusComponent, HotelComponent, TrainComponent } from './Components';

import './home.css';

function Home() {

    return (
        <div className='logo-container inset-0'>
            <CompanyLogo height='100px' />
            <div className="container-wrapper">
                <BusComponent />
                <HotelComponent />
                <TrainComponent />
            </div>
            <h1 className="title m-10" >Shotti Bookings</h1>
        </div>
    );
}

export default Home;
