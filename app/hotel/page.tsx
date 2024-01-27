import { SolidContainer } from '@/components/Containers/Containers';
import Head from 'next/head';

const HotelService = () => {
    return (
        <>
            <Head>
                <title>
                    Hotel Booking Service | Shotti Bookings
                </title>
                <meta
                    name="description"
                    content="Hotel Booking Service | Shotti Bookings"
                    key="desc"
                />
            </Head>
            <SolidContainer width='50%' height='20%' minHeight='200px' minWidth='300px' >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Hotel Service</h1>
                        <h2>Coming Soon</h2>
                    </div>
                </div>
            </SolidContainer>
        </>
    )
}

export default HotelService;