import { SolidContainer } from '@/components/Containers/Containers';

const HotelService = () => {
    return (
        <SolidContainer width='50%' height='20%' minHeight='200px' minWidth='300px' >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <h1 style={{ fontSize: '30px', fontWeight: 'bold' }}>Hotel Service</h1>
                    <h2>Coming Soon</h2>
                </div>
            </div>
        </SolidContainer>
    )
}

export default HotelService;