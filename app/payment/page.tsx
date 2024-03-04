'use client'

import Image from 'next/image'
import bkashImage from '@/public/assets/BKash.png'
import sslCommerzImage from '@/public/assets/sslcommerz.png'
import { Button, Card } from '@nextui-org/react';
import { siteConfig } from '@/config/site';
import { useRouter, useSearchParams } from 'next/navigation'

function PaymentPage() {
    const router = useRouter();

    const [searchParams] = useSearchParams();
    if (!searchParams) {
        router.push('/bus');
    }
    console.log(searchParams);


    const handleBkashPayment = () => {
        const paymentData = {
            amount: 100,
            paymentMethod: 'bKash'
        }
        // Send paymentData to server
        fetch(siteConfig.backendServer + '/payment/orderBySSL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(paymentData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                window.location.href = data.paymentUrl;
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    return (
        <>
            <h1 className="text-3xl text-center font-bold m-5">Choose Payment Method</h1>

            <div className="grid grid-cols-2 justify-center items-center gap-5">
                <Card className="flex flex-col items-center justify-center gap-4 p-4">
                    <Image src={bkashImage} alt="bKash" />
                    <Button
                        onClick={() => {
                            window.location.href = 'https://www.bkash.com/';
                        }}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        bKash
                    </Button>
                </Card>
                <Card className="flex flex-col items-center justify-center gap-4 p-4">
                    <Image src={sslCommerzImage} alt="SSLCommerz" />
                    <Button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                    >
                        SSLCommerz
                    </Button>
                </Card>
            </div>
        </>
    )
}

export default PaymentPage;