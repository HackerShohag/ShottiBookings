import React, { useState, useEffect } from 'react'
import { HidePassIcon, ShowPassIcon } from './icons';

type ShowHidePasswordProps = {
    onClick: (showPass: boolean) => void;
}

export default function ShowHidePassword({ onClick }: ShowHidePasswordProps) {
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        onClick(showPassword);
    }, [showPassword, onClick]);


    return (
        <div onClick={
            () => {
                setShowPassword(!showPassword);
            }}
            className='cursor-pointer'>
            {showPassword ? <ShowPassIcon /> : <HidePassIcon />}
        </div>
    )
}
