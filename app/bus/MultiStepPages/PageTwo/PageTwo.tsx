"use client";

import { Card, CardBody, CardHeader, CircularProgress } from "@nextui-org/react";
import { FormData, OfferedJourney } from "@/types";
import BusInfo from "@/components/BusInfo/BusInfo";
import "./PageTwo.css";

import busImg from "@/public/assets/bus.png";
import { useState } from "react";

interface BasicFormProps {
  offeredJourney: OfferedJourney[];
  processing: boolean;
  bookButtonHandle?: (id: string) => void;
}

const renderOfferedJourney = (journeys: OfferedJourney[], bookButtonHandle: ((id: string) => void) | undefined) => {
  if (Array.isArray(journeys)) {
    return (
      journeys.map((journey, index) => (
        <BusInfo
          key={index}
          id={journey?.bus?.no}
          seatAvailability={journey?.slot.length}
          departureTime={journey?.startTime}
          image={busImg.src}
          fare={journey.fare}
          name={journey?.bus?.companyName}
          onButtonClick={() => { if (bookButtonHandle) { bookButtonHandle(journey.id) } }}
        />
      )));
  } else {
    return (
      <Card className="m-5" style={{ backgroundColor: '#B33A3A' }}>
        <CardHeader>
          <h1 className="text-2xl">No Schedule Found</h1>
        </CardHeader>
        <CardBody>
          <p className="text-sm">Sorry, no schedule available for this route.</p>
          <p className="text-sm">Please try another route.</p>
        </CardBody>
      </Card>
    )
  }
}

const PageTwo = ({ offeredJourney, bookButtonHandle, processing }: BasicFormProps) => {

  const urlSearchParams = new URLSearchParams(window.location.search);
  const source = urlSearchParams.get('source');
  const destination = urlSearchParams.get('destination');
  const date = urlSearchParams.get('date');

  const [formData, setFormData] = useState<FormData>({
    origin: source || '',
    destination: destination || '',
    date: date || '',
    numberOfTickets: 0,
  });

  return (
    <div className="mr-2 ml-2">
      <h1 className="text-2xl text-sky-950">Available Buses from {offeredJourney.at(0)?.from} to {offeredJourney.at(0)?.to}</h1>
      {
        processing ? (
          <div className="flex flex-col justify-center items-center m-5 mb-10">
            <h1 className="text-2xl">Loading...</h1>
            <CircularProgress className="flex flex-col w-full justify-center" color="primary" size="lg" aria-label="Loading..." />
          </div>

        ) : (
          offeredJourney.length == 0 ? (
            <Card className="m-5" style={{ backgroundColor: '#B33A3A' }}>
              <CardHeader>
                <h1 className="text-2xl">No Schedule Found</h1>
              </CardHeader>
              <CardBody>
                <p className="text-sm">Sorry, no schedule available for this route.</p>
                <p className="text-sm">Please try another route.</p>
              </CardBody>
            </Card>
          ) : (
            renderOfferedJourney(offeredJourney, bookButtonHandle)
          )
        )
      }
    </div>
  );
}

export default PageTwo;
