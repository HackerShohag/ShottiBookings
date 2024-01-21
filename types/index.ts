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
