import Image from 'next/image';
import { FC } from "react";

import companyLogo from '@/public/company.jpeg';

const Logo: FC = () => {
    return (
        <div className="m-5 flex justify-center items-center">
            <div className='flex flex-col items-center justify-center'>
                <Image className='' style={{ width: '45px', height: '45px', borderRadius: '50%' }} src={companyLogo} alt='logo' />
                <h5 className="mt-3 text-red-500 text-lg leading-6">Quality Services Assured.</h5>
            </div>
        </div>
    )
}

interface ICompanyLogo {
    className?: string;
    height?: string;
    width?: string;
}

export const CompanyLogo = (props: ICompanyLogo) => {

    return (
        <div className='flex flex-col justify-center mb-10'>
            <Image
                title='Shotti Bookings'
                src={companyLogo}
                alt="Company Logo"
                className="clickable rounded-full"
                style={{ height: props.height ? props.height : '150px', width: props.width ? props.width : 'auto' }}
            />
            <p className="text-lg text-green-500 drop-shadow-2xl font-semibold">Shotti Bookings</p>
        </div>
    );
};


export default Logo;