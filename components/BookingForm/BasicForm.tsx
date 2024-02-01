'use client';

import React, { useState, useEffect } from 'react';
import { Select, SelectItem, Input, Button, Spinner } from "@nextui-org/react";

import { FormData } from '@/types';
import { SelectorIcon } from "@/components/icons";

export interface BasicFormProps {
    formData: FormData;
    routes: string[];
    handleDataAvialblity: (f: boolean) => void;
    handleChange: ((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void) | undefined;
}

export const BasicForm: React.FC<BasicFormProps> = ({ handleChange, formData, routes, handleDataAvialblity }) => {
    const [route, setRoute] = useState({
        origin: '',
        destination: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    };

    const today = new Date();
    const minDate = today.toISOString().split('T')[0];
    const maxDate = new Date(today.setDate(today.getDate() + 7))
        .toISOString()
        .split('T')[0];

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const origin = searchParams.get('origin') || '';
        const destination = searchParams.get('destination') || '';
        const date = searchParams.get('date') || '';

        setRoute((prevData) => ({
            ...prevData,
            origin,
            destination,
        }));
    }, []);


    useEffect(() => {
        console.log
        if (formData.origin && formData.destination && formData.date) {
            handleDataAvialblity(true);
        }
    }, [formData.origin, formData.destination, formData.date, handleDataAvialblity]);


    return (
        <div className='booking-form-container'>
            <form onSubmit={handleSubmit}>
                <Select
                    color="default"
                    isRequired
                    label="From:"
                    placeholder="Select From"
                    className="max-w-xs"
                    labelPlacement="outside"
                    selectorIcon={<SelectorIcon />}
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                >
                    {routes.map((item) => (
                        <SelectItem key={item} value={item}>
                            {item}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    color="default"
                    isDisabled={!formData.origin}
                    isRequired
                    label="To:"
                    placeholder="Select To"
                    className="max-w-xs"
                    labelPlacement="outside"
                    selectorIcon={<SelectorIcon />}
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                >
                    {routes
                        .filter((item) => item !== formData.origin)
                        .map((item) => (
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                        ))}
                </Select>
                <Input
                    color="default"
                    isDisabled={!formData.destination || !formData.origin}
                    labelPlacement='outside'
                    fullWidth
                    isRequired
                    label="Date"
                    type="date"
                    min={minDate}
                    max={maxDate}
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </form >
        </div >
    );
};
