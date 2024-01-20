import { Button } from "@nextui-org/button";
import SeatLayout, { SeatProps } from "@/components/BusSeatLayout/BusSeatLayout";
import "./PageThree.css";

interface BasicFormProps {
  onButtonClick?: (() => void) | undefined;
  origin?: string;
  destination?: string;
  selectedSeats?: string[];
}

const PageThree = ({ onButtonClick, origin, destination, selectedSeats }: BasicFormProps) => {

  return (
    <section>
      <div className="flex flex-col">
        <div className="flex flex-col justify-center m-4">
          <div>
            Origin: {origin}
          </div>
          <div>
            Destination: {destination}
          </div>
        </div>
        <SeatLayout ticketStatus={{ available: "Available", booked: "Booked", occupied: "Occupied" }} />


        <div>
          {/* Selected Seats: {selectedSeats.join(", ")} */}
        </div>
      </div>

      {/* <Button
        type="submit"
        onClick={() => onButtonClick && onButtonClick()}
        fullWidth
      >
        Continue
      </Button> */}
    </section>
  );
}

export default PageThree;