import Image from 'next/image';
import { FC } from "react";

import companyLogo from '@/public/company.jpeg';

import './Logo.css';

const Logo: FC = () => {
    return (
        <div className="ma5 center flex justify-center items-center">
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Image className='' style={{ width: '45px', height: '45px', borderRadius: '50%' }} src={companyLogo} alt='logo' />
                <h5 className="mt3 f4" style={{ lineHeight: '1.5' }}>Quality Services Assured.</h5>
            </div>
        </div>
    )
}

export const CompanyLogo = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Image
                src={companyLogo}
                alt="Company Logo"
                className="logo-image clickable"
                style={{ margin: '50px', height: '150px', width: 'auto' }}
            />
        </div>
    );
};


export default Logo;