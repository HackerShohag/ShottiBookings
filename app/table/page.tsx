import Ticket, { Passenger } from "@/components/Ticket/TicketTable";

import React from 'react'

function TicketPage() {
  const dummyPassenger: Passenger = {
    name: "John Doe",
    gender: "Male",
    seatNo: "A1",
    noviceNo: "123",
    from: "City A",
    to: "City B",
    busTime: "10:00 AM",
    mobileNo: "1234567890"
  };

  return (
    <Ticket passengers={[dummyPassenger]} />
  )
}

export default TicketPage