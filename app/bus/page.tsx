import MultiStepPage from "./MultiStepPages/MultiStepPages";
import PageOne from "./MultiStepPages/PageOne/PageOne";
import PageThree from "./MultiStepPages/PageThree/PageThree";
import PageTwo from "./MultiStepPages/PageTwo/PageTwo";

interface BasicFormProps {
    onButtonClick?: (() => void) | undefined;
}


const BusService = () => {

    const formElements = [
        <PageOne key="pageOne" onButtonClick={undefined} />,
        <PageTwo key="pageTwo" />,
        <PageThree key="pageThree" />
    ]

    return (
        <MultiStepPage MultiStepFormElements={formElements} />
    )
}

export default BusService;