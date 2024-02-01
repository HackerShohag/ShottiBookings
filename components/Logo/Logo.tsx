import Image from 'next/image';
import { FC } from "react";

import companyLogo from '@/public/logo.png';

const Logo: FC = () => {
    return (
        <div className="m-5 flex justify-center items-center">
            <div className='flex flex-col items-center justify-center'>
                <Image className='' style={{ width: '45px', height: '45px', borderRadius: '50%' }} src={companyLogo} alt='logo' />
                <h5 className="mt-3 text-sky-950 font-bold text-lg leading-6">Quality Services Assured.</h5>
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
        <div className='mb-10'>
            <div className='flex flex-col'>
                <Image
                    title='Shotti Bookings'
                    src={companyLogo}
                    alt="Company Logo"
                    className="clickable rounded-full"
                    style={{ height: props.height ? props.height : '150px', width: props.width ? props.width : '100px' }}
                />
            </div>
            <p className="text-lg text-green-500 drop-shadow-2xl font-semibold">Shotti Bookings</p>
        </div>
    );
};


export default Logo;