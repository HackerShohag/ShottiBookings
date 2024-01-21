'use client';

import { useState } from "react";
import { FormData } from "@/types";

import MultiStepPage from "./MultiStepPages/MultiStepPages";
import PageOne from "./MultiStepPages/PageOne/PageOne";
import PageThree from "./MultiStepPages/PageThree/PageThree";
import PageTwo from "./MultiStepPages/PageTwo/PageTwo";

interface BasicFormProps {
    onButtonClick?: (() => void) | undefined;
}

const BusService = ({ onButtonClick }: BasicFormProps) => {

    const [formData, setFormData] = useState<FormData>({
        origin: '',
        destination: '',
        date: '',
        numberOfTickets: 1,
    });

    console.log('Form submitted:', formData);
    if (onButtonClick) {
        onButtonClick();
    }
    const searchParams = new URLSearchParams();
    searchParams.set('source', formData.origin);
    searchParams.set('destination', formData.destination);
    searchParams.set('date', formData.date);
    window.history.pushState({}, '', `?${searchParams.toString()}`);


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