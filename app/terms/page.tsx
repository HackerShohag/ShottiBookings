'use client';

import { Card, CardBody, CardHeader, Divider, Accordion, AccordionItem } from '@nextui-org/react';

const Terms = () => {
    return (
        <div>
            <Card>
                <CardHeader className='flex justify-center text-3xl'>
                    Shotti Bookings Terms and Conditions
                </CardHeader>

                <CardBody>
                    <Accordion>
                        <AccordionItem title="Booking Process">
                            <p>
                                Users can book bus tickets through the Shotti Bookings platform.
                                The booking process includes selecting the desired route, date, and providing passenger information.
                                Users will receive a confirmation email or SMS after a successful booking.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Ticket Cancellation">
                            <p>
                                Shotti Bookings does not provide a ticket cancellation service.
                                Once a ticket is booked, it is considered final, and no refunds or cancellations are allowed.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Ticket Modification">
                            <p>
                                Users cannot modify the details of a booked ticket after confirmation.
                                Any changes or adjustments required must be made during the initial booking process.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Payment Policy">
                            <p>
                                Users must make payments for booked tickets through the available online payment methods.
                                Shotti Bookings ensures a secure payment process, and all transactions are subject to the payment gateway&apos;s terms.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Traveler Responsibility">
                            <p>
                                Passengers are responsible for carrying a valid ID and the booking confirmation during the journey.
                                Shotti Bookings is not liable for any issues arising from the passenger&apos;s failure to provide the necessary documents.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Service Availability">
                            <p>
                                Bus services are subject to availability.
                                Shotti Bookings reserves the right to modify or withdraw services without prior notice.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Customer Support">
                            <p>
                                Users can contact Shotti Bookings customer support for assistance regarding the booking process, payments, or other inquiries.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Data Privacy">
                            <p>
                                Shotti Bookings values user privacy and employs measures to protect personal information.
                                Users can refer to the Privacy Policy for details on data collection, storage, and usage.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Force Majeure">
                            <p>
                                Shotti Bookings is not responsible for disruptions or cancellations due to unforeseen circumstances like natural disasters, strikes, or government regulations.
                            </p>
                        </AccordionItem>

                        <AccordionItem title="Disclaimer">
                            <p>
                                Shotti Bookings is not liable for any loss, damage, or inconvenience caused during the journey.
                                Users are encouraged to review and agree to these terms before making a booking.
                            </p>
                        </AccordionItem>
                    </Accordion>

                    <p>
                        By using Shotti Bookings, users agree to abide by these terms and
                        conditions. Shotti Bookings reserves the right to update or modify
                        these terms as needed, and users are advised to check for any changes
                        periodically.
                    </p>
                </CardBody>
            </Card>
        </div>
    );
};

export default Terms;
