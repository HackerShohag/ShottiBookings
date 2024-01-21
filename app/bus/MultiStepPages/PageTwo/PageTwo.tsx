"use client";

import { Card, CardBody, CardHeader, CircularProgress } from "@nextui-org/react";
import { OfferedJourney } from "@/types";
import BusInfo from "@/components/BusInfo/BusInfo";
import "./PageTwo.css";

import busImg from "@/public/assets/bus.png";

interface BasicFormProps {
  offeredJourney: OfferedJourney[];
  processing: boolean;
  onButtonClick?: (() => void);
}

const renderOfferedJourney = (journeys: OfferedJourney[], onButtonClick: (() => void) | undefined) => {
  if (Array.isArray(journeys)) {
    return (
      journeys.map((journey, index) => (
        <BusInfo
          key={index}
          id={journey?.bus?.no}
          seatAvailability={journey?.slot.length}
          departureTime={journey?.startTime}
          image={busImg.src}
          route={journey?.from + " - " + journey?.to}
          fare={500}
          name={journey?.bus?.companyName}
          onButtonClick={() => { if (onButtonClick) { onButtonClick() } }}
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

const PageTwo = ({ offeredJourney, onButtonClick, processing }: BasicFormProps) => {

  return (
    <div className="mr-2 ml-2">
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
            renderOfferedJourney(offeredJourney, onButtonClick)
          )
        )
      }
    </div>
  );
}

export default PageTwo;
