"use client";

import { useEffect, useState } from "react";
import "./PageTwo.css";
import BusInfo from "@/components/BusInfo/BusInfo";
import { siteConfig } from "@/config/site";
import { Card, CardBody, CardHeader, CircularProgress } from "@nextui-org/react";

import busImg from "@/public/assets/bus.png";

interface BasicFormProps {
  onButtonClick?: (() => void) | undefined;
}

interface OfferedJourney {
  bus: {
    no: string;
    companyName: string;
  };
  slot: any[];
  startTime: string;
  from: string;
  to: string;
}

const PageTwo = ({ onButtonClick }: BasicFormProps) => {
  const searchParams = new URLSearchParams(location.search);
  const source = searchParams.get("source");
  const destination = searchParams.get("destination");
  const date = searchParams.get("date");

  const [offeredJourney, setOfferedJourney] = useState<OfferedJourney[]>([]);
  const [processing, setProcessing] = useState(true);

  useEffect(() => {
    console.log("Source:", source);
    console.log("Destination:", destination);
    console.log("Date:", date);

    const fetchData = async () => {
      try {
        fetch(siteConfig.backendServer.address + "/offeredJourney/get-offeredJourney", {
          method: 'POST',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            from: source,
            stops: [destination],
            date: date
          }),
        }).then(response => response.json())
          .then(result => {
            setOfferedJourney(result?.data);
            setProcessing(false);
          });
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchData();
  }, [source, destination, date]);

  return (
    <div className="mr-2 ml-2">
      {
        processing ? (
          <div className="flex flex-col justify-center items-center m-5 mb-10">
            <h1 className="text-2xl">Loading...</h1>
            <CircularProgress className="flex flex-col w-full justify-center" color="primary" size="lg" aria-label="Loading..." />
          </div>

        ) : (
          offeredJourney.length !== 0 ? (
            offeredJourney.map((journey, index) => (
              <BusInfo
                key={index}
                id={journey?.bus?.no}
                seatAvailability={journey?.slot.length}
                departureTime={journey?.startTime}
                image={busImg.src}
                route={journey?.from + " - " + journey?.to}
                fare={500}
                name={journey?.bus?.companyName}
                onButtonClick={onButtonClick}
              />
            ))) : (
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
        )
      }
    </div>
  );
}

export default PageTwo;
