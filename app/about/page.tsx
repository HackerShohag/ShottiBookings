'use client';

import React from 'react';
import { Accordion, AccordionItem, Card, CardBody, CardHeader } from '@nextui-org/react';
import Head from 'next/head';

const Details: React.FC = () => {
	return (
		<div>
			<Head>
				<title>
					Shotti Bookings - Your Seamless Travel Experience | Shotti Bookings
				</title>
				<meta
					name="description"
					content="Shotti Bookings - Your Seamless Travel Experience. Discover a world of convenience, reliability, and innovation with Shotti Bookings."
					key="desc"
				/>
			</Head>

			<Card className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<CardHeader className="text-3xl font-bold mb-4 mt-4">
					Shotti Bookings - Your Seamless Travel Experience
				</CardHeader>
				<CardBody>
					<p className="mb-8 pl-4">
						Shotti Bookings is not just a bus booking service; it&apos;s a seamless travel
						experience designed with you in mind. As you embark on your journey with Shotti
						Bookings, you&apos;ll discover a world of convenience, reliability, and innovation.
					</p>

					<h2 className="text-xl mb-4">Key Features</h2>
					<div className="mb-4">
						<p className="pl-4 list-disc">
							Easy online bus ticket booking.
						</p>
						<p className="pl-4 list-disc">
							Seamless and secure payment options.
						</p>
						<p className="pl-4 list-disc">
							Wide range of bus services and routes.
						</p>
						<p className="pl-4 list-disc">
							Real-time updates and notifications.
						</p>
					</div>


					<h2 className="text-xl mb-4">Why Shotti Bookings?</h2>
					<p className="pl-4 mb-8">
						Shotti Bookings goes beyond being just a bus booking platform; it&apos;s your
						reliable travel companion. With a commitment to excellence, convenience, and
						customer satisfaction, we aim to redefine your travel experience. Join us on a
						journey where every mile is an opportunity to create lasting memories. Shotti
						Bookings — where your journey begins seamlessly.
					</p>

					{/* <Accordion>
				<AccordionItem title="Is there a cancellation service?">
					<p>
					Currently, Shotti Bookings does not offer a ticket cancellation service. Once
						a ticket is booked, it is considered final.
						</p>
						</AccordionItem>
					</Accordion> */}
				</CardBody>
			</Card>
		</div>
	);
};

export default Details;
