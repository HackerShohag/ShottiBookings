import tick from './tick.jpg';
import Image from 'next/image';

interface BasicFormProps {
  onButtonClick?: (() => void) | undefined;
}

const PageFour = ({ onButtonClick }: BasicFormProps) => {

  if (onButtonClick) {
    onButtonClick();
  }

  return (
    <div
      className="mw5 bg-white pa2-ns mt5 dib"
      style={{ maxWidth: "30%", maxHeight: '30%' }}
    >
      <Image
        src={tick.src}
        className="h3 w3"
        title="success icon"
        alt="tick-icon"
      />
      <div className="center"><h3 className="">Congratulations, Eren!</h3></div>
      <p style={{ color: "#C0C0C0" }}>
        You have completed the onboarding, you can start using the Eden!
      </p>
      <input
        className="f6 grow br2 ph3 pv2 mb2 dib white"
        style={{ borderStyle: "none", width: "100%", backgroundColor: '#664DE5' }}
        type="submit"
        value="Launch Eden"
      />
    </div>
  );
}

export default PageFour;