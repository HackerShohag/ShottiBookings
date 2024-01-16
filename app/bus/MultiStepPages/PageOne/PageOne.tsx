import "./PageOne.css";
import BookingForm from "../../../../components/BookingForm/Form";

interface BasicFormProps {
  onButtonClick?: (() => void) | undefined;
}

const PageOne = ({ onButtonClick }: BasicFormProps) => {

  return (
    <BookingForm onButtonClick={onButtonClick} />
  )
};

export default PageOne;
