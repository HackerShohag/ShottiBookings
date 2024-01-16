import "./PageTwo.css";
import BusInfo from '@/components/BusInfo/BusInfo';

const busImg = require('@/public/assets/bus.png');

interface BasicFormProps {
  onButtonClick?: (() => void) | undefined;
}

const PageTwo = ({ onButtonClick }: BasicFormProps) => {
  return (
    <div className="mr-2 ml-2">
      <BusInfo
        name="Kaveri Travels"
        id="KAVERI"
        seatAvailability={10}
        departureTime="10:00 AM"
        image={busImg}
        route="Bangalore to Chennai"
        fare={500}
        onButtonClick={onButtonClick}
      />
      <BusInfo name="Kaveri Travels"
        id="KAVERI"
        seatAvailability={10}
        departureTime="10:00 AM"
        image={busImg}
        route="Bangalore to Chennai"
        fare={500}
        onButtonClick={onButtonClick}
      />
    </div>
  );
}

export default PageTwo;