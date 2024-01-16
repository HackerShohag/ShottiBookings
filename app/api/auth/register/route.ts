import { NextResponse } from 'next/server';
import { useRouter } from 'next/navigation';
import { siteConfig } from '@/config/site';

export async function POST(request: Request) {
    const router = useRouter();
    try {
        const { name, email, contactNumber, gender, password } = await request.json();

        const data = {
            password: password,
            user: {
                name: name,
                email: email,
                contactNo: contactNumber,
                gender: gender,
                isDeleted: false,
            }
        }

        fetch(siteConfig.backendServer.address + '/user/create-customer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        }).then(res => res.json()).then(
            data => {
                console.log("User have been created.");
                router.push(siteConfig.links.login);
            }
        ).catch((error) => {
            console.error('Error:', error);
        });

    } catch (e) {
        console.log({ e });
    }

    return NextResponse.json({ message: 'success' });
}
