'use client';

import { Card, Divider, Accordion, AccordionItem, Link, CardHeader, CardBody, CardFooter } from '@nextui-org/react';

const FAQ = () => {
  return (
    <div>
      <Card >
        <CardHeader>
          Frequently Asked Questions (FAQ)
        </CardHeader>

        <CardBody>
          <Accordion>
            <AccordionItem title="Q: How can I book a bus ticket?">
              <p>
                A: Booking a bus ticket is easy! Simply visit our website,
                choose your destination, select the preferred date and time, and
                complete the payment process.
              </p>
            </AccordionItem>

            <AccordionItem title="Q: Can I cancel my bus ticket?">
              <p>
                A: Unfortunately, we do not offer a ticket cancellation service.
                Once a ticket is booked, it is non-refundable.
              </p>
            </AccordionItem>

            <AccordionItem title="Q: Are there any hidden fees?">
              <p>
                A: No, we are transparent about our fees. The total amount
                displayed during the booking process includes all applicable
                charges.
              </p>
            </AccordionItem>

            <AccordionItem title="Q: How can I contact customer support?">
              <p>
                A: You can reach our customer support team through the contact form on our website or by emailing <Link href="mailto:support@shottibookings.com">support@shottibookings.com</Link>.
              </p>
            </AccordionItem>

          </Accordion>
        </CardBody>
        <CardFooter>
          For any query please, <Link href="/contact-us">{" "}Contact Us</Link>.
        </CardFooter>
      </Card>
    </div>
  );
};

export default FAQ;

