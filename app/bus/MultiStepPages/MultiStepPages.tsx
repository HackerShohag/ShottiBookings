'use client';

import { Card, CardBody, Progress, Button } from "@nextui-org/react";

import { useState } from "react";
import Logo from "../../../components/Logo/Logo";
import "@/components/Containers/styles.css";

interface MultiStepPageProps {
    nextButtonFunction: () => void;
    nextButtonAvailable?: boolean;
    MultiStepFormElements?: JSX.Element[]
}

function MultiStepPage({ MultiStepFormElements, nextButtonAvailable, nextButtonFunction }: MultiStepPageProps) {

    const [activeTab, setActiveTab] = useState(0);

    const elementLenght = MultiStepFormElements?.length || 0;

    return (
        <Card
            className="flex flex-col justify-center border-none bg-gray-400 max-w-[900px] flex justify-center self-center"
            shadow="sm"
        >
            <CardBody>
                <Logo />
                <Progress className="mt-5 mb-5" size="lg" aria-label="Loading..." value={(100 / elementLenght) * activeTab} />
                {
                    MultiStepFormElements?.[activeTab]
                }

                <div className='mr-5 ml-5 flex flex-wrap gap-x-6 justify-between'>
                    <Button
                        disabled={activeTab === 0}
                        onClick={() => setActiveTab(prev => prev - 1)}
                        variant={activeTab === 0 ? "flat" : "solid"}
                    >
                        Back
                    </Button>
                    {activeTab === elementLenght - 1 ? (
                        <Button
                            className='right px-4 py-2 rounded-xl bg-blue-600 text-white'
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            isDisabled={!nextButtonAvailable}
                            variant={!nextButtonAvailable ? "flat" : "solid"}
                            color={!nextButtonAvailable ? "default" : "primary"}
                            onClick={() => {
                                setActiveTab(prev => prev + 1);
                                nextButtonFunction();
                            }}
                        >
                            Next
                        </Button>
                    )}
                </div>
            </CardBody>
        </Card>
    );
}

export default MultiStepPage;