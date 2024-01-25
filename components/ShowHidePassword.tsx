import React, { useState } from 'react'
import { HidePassIcon, ShowPassIcon } from './icons';

type ShowHidePasswordProps = {
    onClick: (showPass: boolean) => void;
}

export default function ShowHidePassword({ onClick }: ShowHidePasswordProps) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
        onClick(showPassword);
    }

    return (
        <div onClick={togglePasswordVisibility} className='cursor-pointer'>
            {showPassword ? <ShowPassIcon /> : <HidePassIcon />}
        </div>
    )
}
