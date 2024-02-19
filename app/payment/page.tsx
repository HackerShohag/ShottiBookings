'use client'

import Image from 'next/image'
import bkashImage from '@/public/assets/BKash.png'
import sslCommerzImage from '@/public/assets/sslcommerz.png'
import { Button, Card } from '@nextui-org/react';

function PaymentPage() {
    return (
        <>
            <h1 className="text-3xl text-center font-bold m-5">Choose Payment Method</h1>

            <div className="grid grid-cols-2 justify-center items-center gap-5">
                <Card className="flex flex-col items-center justify-center gap-4 p-4">
                    <Image src={bkashImage} alt="bKash" />
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">bKash</Button>
                </Card>
                <Card className="flex flex-col items-center justify-center gap-4 p-4">
                    <Image src={sslCommerzImage} alt="SSLCommerz" />
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">SSLCommerz</Button>
                </Card>
            </div>
        </>
    )
}

export default PaymentPage;