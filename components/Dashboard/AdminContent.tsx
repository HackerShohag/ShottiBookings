'use client';

import { Button, Card, CardBody, CardHeader, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import SeatLayout from "../BusSeatLayout/BusSeatLayout";

export default function Content() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { isOpen: isModalOpen, onOpen: onModalOpen, onClose: onModalClose } = useDisclosure();
  const { isOpen: isDateModalOpen, onOpen: onDateModalOpen, onClose: onDateModalClose } = useDisclosure();
  const [currentButSeats, setCurrentBusSeats] = useState<number[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<number>();

  const [busSchedules, setBusSchedules] = useState([
    { id: 1, from: "Dhaka", to: "Chittagong", date: "2022-01-01", time: "9:00", tickets: { available: 10, sold: 20, reserved: 22 }, ac: true },
    { id: 2, from: "Dhaka", to: "Sylhet", date: "2022-01-02", time: "10:30", tickets: { available: 15, sold: 10, reserved: 7 }, ac: false },
    { id: 3, from: "Dhaka", to: "Rajshahi", date: "2022-01-03", time: "12:00", tickets: { available: 20, sold: 5, reserved: 0 }, ac: true },
    { id: 4, from: "Dhaka", to: "Khulna", date: "2022-01-04", time: "14:30", tickets: { available: 5, sold: 17, reserved: 1 }, ac: false },
  ]);

  const [inputValue, setInputValue] = useState("");
  const [dateInputValue, setDateInputValue] = useState("");

  const openSelectedBus = (key: number) => {
    onOpen();
    setCurrentBusSeats(Object.values(busSchedules[key].tickets));
  }

  const openModalWithSchedule = (key: number) => {
    setSelectedSchedule(key);
    onModalOpen();
  }

  const openDateModalWithSchedule = (key: number) => {
    setSelectedSchedule(key);
    onDateModalOpen();
  }

  const handleChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleDateChange = (e: any) => {
    e.preventDefault();
    console.log(e.target.value);
    setDateInputValue(e.target.value);
  };

  const changeSchedule = () => {
    if (selectedSchedule !== undefined) {
      const updatedSchedules = [...busSchedules];
      updatedSchedules[selectedSchedule - 1].time = inputValue;
      setBusSchedules(updatedSchedules);
    }
    onModalClose();
  }

  const changeDate = () => {
    if (selectedSchedule !== undefined) {
      const updatedSchedules = [...busSchedules];
      updatedSchedules[selectedSchedule - 1].date = dateInputValue;
      setBusSchedules(updatedSchedules);
    }
    onDateModalClose();
  }

  const formatTime = (time: string) => {
    const [hour, minute] = time.split(":");
    const formattedHour = parseInt(hour) > 12 ? parseInt(hour) - 12 : parseInt(hour);
    const amPm = parseInt(hour) >= 12 ? "PM" : "AM";
    return `${formattedHour}:${minute} ${amPm}`;
  };

  return (
    <div className="flex flex-col h-full lg:px-6 gap-5">
      <h1 className="flex justify-center text-3xl font-bold">Admin Dashboard</h1>
      <Card>
        <CardBody>
          <CardHeader title="Bus Schedule" >
            <p className="flex w-full justify-center text-lg">Bus Schedules from {"Dhaka"} to {"Rajshahi"}</p>
          </CardHeader>
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn style={{ width: "20%" }}>DATE</TableColumn>
              <TableColumn style={{ width: "25%" }}>SCHEDULED TIME</TableColumn>
              <TableColumn style={{ width: "40%" }}>
                <p className="flex justify-center">TICKETS</p>
                <div className="flex justify-between gap-2">
                  <p>AVAILABLE</p>
                  <p>SOLD</p>
                  <p>RESERVED</p>
                </div>
              </TableColumn>
              <TableColumn>AC/Non-AC</TableColumn>
            </TableHeader>
            <TableBody>
              {busSchedules.map((schedule, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Button onClick={() => { openDateModalWithSchedule(schedule.id) }} variant="light">
                      {schedule.date}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => { openModalWithSchedule(schedule.id) }} variant="light">
                      {formatTime(schedule.time)}
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button onClick={() => { openSelectedBus(schedule.id) }} className="flex w-full justify-between gap-2">
                      <p>{schedule.tickets.available}</p>
                      <p>{schedule.tickets.sold}</p>
                      <p>{schedule.tickets.reserved}</p>
                    </Button>
                  </TableCell>
                  <TableCell>
                    {schedule.ac ? "AC" : "Non-AC"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Bus Tickets</ModalHeader>
              <ModalBody>
                <SeatLayout ticketStatus={{ available: "Available", booked: "Booked", occupied: "Reserved" }} />
                <div className="flex felx-row justify-center gap-2">
                  <Button>
                    Cancel Ticket
                  </Button>
                  <Button>
                    Book Ticket
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isModalOpen} onOpenChange={onModalClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Enter Text</ModalHeader>
              <ModalBody>
                <Input type="time" value={inputValue} onChange={handleChange} />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" color="danger" onClick={onModalClose}>Close</Button>
                <Button color="primary" onClick={changeSchedule}>Add Schedule</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal isOpen={isDateModalOpen} onOpenChange={onDateModalClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Enter Date</ModalHeader>
              <ModalBody>
                <Input type="date" value={dateInputValue} onChange={handleDateChange} />
              </ModalBody>
              <ModalFooter>
                <Button variant="light" color="danger" onClick={onDateModalClose}>Close</Button>
                <Button color="primary" onClick={changeDate}>Change Date</Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
