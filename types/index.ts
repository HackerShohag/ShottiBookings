import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type FormData = {
  origin: string;
  destination: string;
  date: string;
  numberOfTickets: number;
}

export type OfferedJourney = {
  bus: {
    no: string;
    companyName: string;
  };
  slot: any[];
  startTime: string;
  from: string;
  to: string;
}