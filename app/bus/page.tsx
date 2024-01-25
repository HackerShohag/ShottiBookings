'use client';

import { useEffect, useState } from "react";
import { FormData, OfferedJourney } from "@/types";

import MultiStepPage from "./MultiStepPages/MultiStepPages";
import PageOne from "./MultiStepPages/PageOne/PageOne";
import PageThree from "./MultiStepPages/PageThree/PageThree";
import PageTwo from "./MultiStepPages/PageTwo/PageTwo";
import { siteConfig } from "@/config/site";


const BusService = () => {

    const [isNextButtonAvailable, setIsNextButtonAvailable] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [routes, setRoutes] = useState<string[]>([]);
    const [offeredJourney, setOfferedJourney] = useState<OfferedJourney[]>([]);


    const [formData, setFormData] = useState<FormData>({
        origin: '',
        destination: '',
        date: '',
        numberOfTickets: 0,
    });

    const searchParams = new URLSearchParams();


    // // get data from search params for source, destination and date
    // const urlSearchParams = new URLSearchParams(window.location.search);
    // const source = urlSearchParams.get('source');
    // const destination = urlSearchParams.get('destination');
    // const date = urlSearchParams.get('date');
    // // set data to form data
    // setFormData((prevData) => ({ ...prevData, origin: source || '', destination: destination || '', date: date || '' }));


    searchParams.set('source', formData.origin);
    searchParams.set('destination', formData.destination);
    searchParams.set('date', formData.date);
    if (typeof window !== 'undefined') {
        window.history.pushState({}, '', `?${searchParams.toString()}`);
    }

    useEffect(() => {
        setProcessing(true);
        const fetchRoutes = async () => {
            const res = await fetch(siteConfig.backendServer.address + '/routes/get-routes',
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

            const data = await res.json();
            setRoutes(data?.data.at(0)?.routes);
        }
        fetchRoutes();
        setProcessing(false);
    }, []);

    const nextButtonFunction = () => {
        setProcessing(true);
        const fetchOfferedJourney = async () => {
            const res = await fetch(siteConfig.backendServer.address + '/offeredJourney/get-offeredJourney',
                {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        from: formData.origin,
                        stops: [formData.destination],
                        date: formData.date
                    }),
                });

            const data = await res.json();
            console.log(data);
            setOfferedJourney(data);
        }
        fetchOfferedJourney();
        setProcessing(false);
        setIsNextButtonAvailable(false);
    }

    const handlePageOneChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const formElements = [
        <PageOne key="pageOne" processing={processing} routes={routes} formData={formData} handleChange={handlePageOneChange} handleDataAvialblity={setIsNextButtonAvailable} />,
        <PageTwo key="pageTwo" processing={processing} offeredJourney={offeredJourney} onButtonClick={undefined} />,
        <PageThree key="pageThree" />
    ]

    return (
        <MultiStepPage MultiStepFormElements={formElements} nextButtonAvailable={isNextButtonAvailable} nextButtonFunction={nextButtonFunction} />
    )
}

export default BusService;