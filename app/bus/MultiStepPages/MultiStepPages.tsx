'use client';

import { Tabs, Tab, Card, CardBody, Progress, Button } from "@nextui-org/react";

import { useState } from "react";
import MultiStepProgressBar from "../../../components/MultiStepProgressBar/MultiStepProgressBar";
import Logo from "../../../components/Logo/Logo";
import PageOne from "./PageOne/PageOne";
import PageTwo from "./PageTwo/PageTwo";
import PageThree from "./PageThree/PageThree";
import PageFour from "./PageFour/PageFour";
import '../../../components/Containers/styles.css';

function MultiStepPage() {
    const [data, setData] = useState({
        name: "",
        email: "",
        dob: "",
        gender: "male",
        address: "",
    })

    const [activeTab, setActiveTab] = useState(0)

    const handleButtonClick = () => {
        setActiveTab(activeTab + 1)
    }

    const formElements = [
        <PageOne key="pageOne" onButtonClick={handleButtonClick} />,
        <PageTwo key="pageTwo" />,
        <PageThree key="pageThree" />
    ]

    return (
        <div className='flex flex-col justify-center'>
            <Card
                className="border-none bg-gray-400 max-w-[900px] flex justify-center self-center"
                shadow="sm"
            >
                <CardBody>
                    <Logo />
                    <Progress className="mt-5 mb-5" size="lg" aria-label="Loading..." value={(100 / formElements.length) * activeTab} />
                    {
                        formElements[activeTab]
                    }

                    <div className='mr-5 ml-5 flex flex-wrap gap-x-6 justify-between'>
                        <Button
                            disabled={activeTab === 0}
                            onClick={() => setActiveTab(prev => prev - 1)}
                            className={`px-4 py-2 rounded-xl bg-blue-600 text-white ${activeTab === 0 ? "opacity-50 bg-slate-600 left" : "opacity-100"}`}>
                            Back
                        </Button>
                        {activeTab === formElements.length - 1 ? (
                            <Button className='right px-4 py-2 rounded-xl bg-blue-600 text-white' onClick={() => console.log(data)}>
                                Submit
                            </Button>
                        ) : (
                            <Button
                                disabled={activeTab === formElements.length - 1}
                                onClick={() => setActiveTab(prev => prev + 1)}
                                className={`right px-4 py-2 rounded-xl bg-blue-600 text-white ${activeTab === formElements.length - 1 ? "opacity-50 bg-slate-600" : "opacity-100"
                                    }`}>
                                Next
                            </Button>
                        )}
                    </div>

                </CardBody>
            </Card>
        </div>
    );
}

export default MultiStepPage;