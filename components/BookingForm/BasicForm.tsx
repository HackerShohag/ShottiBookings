'use client';

import React, { useState, useEffect } from 'react';
import { Select, SelectItem, Input, Button } from "@nextui-org/react";
import { cities as citiesbd } from './data';
import { SelectorIcon } from "@/components/icons";

export interface City {
    id: string;
    source: string;
    destinations: string[];
}

export interface FormData {
    origin: string;
    destination: string;
    date: string;
    numberOfTickets: number;
}

export interface BasicFormProps {
    onButtonClick: (() => void) | undefined;
}

export const BasicForm: React.FC<BasicFormProps> = ({ onButtonClick }) => {
    const [formData, setFormData] = useState<FormData>({
        origin: '',
        destination: '',
        date: '',
        numberOfTickets: 1,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        if (onButtonClick) {
            onButtonClick();
        }
        const searchParams = new URLSearchParams();
        searchParams.set('source', formData.origin);
        searchParams.set('destination', formData.destination);
        searchParams.set('date', formData.date);
        window.history.pushState({}, '', `?${searchParams.toString()}`);
    };

    // Calculate minimum and maximum dates for the date picker
    const today = new Date();
    const minDate = today.toISOString().split('T')[0]; // Minimum date is today
    const maxDate = new Date(today.setDate(today.getDate() + 7))
        .toISOString()
        .split('T')[0]; // Maximum date is today + 7 days

    useEffect(() => {
        // Restore values from search params
        const searchParams = new URLSearchParams(window.location.search);
        const origin = searchParams.get('origin') || '';
        const destination = searchParams.get('destination') || '';
        const date = searchParams.get('date') || '';

        setFormData((prevData) => ({
            ...prevData,
            origin,
            destination,
            date,
        }));

        fetch('src/assets/cities.json')
            .then((response) => response.json())
            .then((data) => {
                if (!origin) {
                    setFormData((prevData) => ({ ...prevData, origin: data[0]?.value }));
                }
            })
            .catch((error) => console.error('Error fetching cities:', error));
    }, []);

    return (
        <div className='booking-form-container'>
            <form onSubmit={handleSubmit}>
                <Select
                    label="Select Source:"
                    placeholder="Select Source"
                    className="max-w-xs"
                    // disableSelectorIconRotation
                    labelPlacement="outside"
                    selectorIcon={<SelectorIcon />}
                    name="origin"
                    value={formData.origin}
                    onChange={handleChange}
                >
                    {citiesbd.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    label="Select Destination:"
                    placeholder="Select Destination"
                    className="max-w-xs"
                    labelPlacement="outside"
                    // disableSelectorIconRotation
                    selectorIcon={<SelectorIcon />}
                    name="destination"
                    value={formData.destination}
                    onChange={handleChange}
                >
                    {citiesbd.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                <label htmlFor="date">Date:</label>
                <Input
                    fullWidth
                    isRequired
                    type="date"
                    labelPlacement='outside'
                    min={minDate}
                    max={maxDate}
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
                <Button
                    fullWidth
                    type='submit'
                >
                    Check Route
                </Button>
            </form>
        </div>
    );
};
