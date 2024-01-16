import React, { useState, useEffect } from 'react';
import { Select, SelectItem, Input, Button } from "@nextui-org/react";
import { cities as citiesbd } from './data';
import { BasicFormProps, FormData, City } from './Form';
import { SelectorIcon } from "@/components/icons";


export const BasicForm: React.FC<BasicFormProps> = ({ onButtonClick }) => {
    const [formData, setFormData] = useState<FormData>({
        origin: '',
        destination: '',
        date: '',
        numberOfTickets: 1,
    });

    const [cities, setCities] = useState<City[]>([]);
    const [filteredDestinations, setFilteredDestinations] = useState<string[]>([]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));

        if (name === 'origin') {
            const selectedCity = cities.find((city) => city.source === value);
            setFilteredDestinations(selectedCity ? selectedCity.destinations : []);
        }
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form submitted:', formData);
        if (onButtonClick) {
            onButtonClick();
        }
    };

    // Calculate minimum and maximum dates for the date picker
    const today = new Date();
    const minDate = today.toISOString().split('T')[0]; // Minimum date is today
    const maxDate = new Date(today.setDate(today.getDate() + 7))
        .toISOString()
        .split('T')[0]; // Maximum date is today + 7 days

    useEffect(() => {
        fetch('src/assets/cities.json')
            .then((response) => response.json())
            .then((data) => {
                setCities(data);
                setFilteredDestinations(data[0]?.destinations || []);
            })
            .catch((error) => console.error('Error fetching cities:', error));
    }, []);

    return (
        <div className='booking-form-container'>
            <form onSubmit={handleSubmit}>
                <label htmlFor="origin">Select Source:</label>
                <Select
                    placeholder="Select Source"
                    className="max-w-xs"
                    disableSelectorIconRotation
                    labelPlacement="outside"
                    selectorIcon={<SelectorIcon />}
                >
                    {citiesbd.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                <label htmlFor="destination">Select Destination:</label>
                <Select
                    placeholder="Select Destination"
                    className="max-w-xs"
                    labelPlacement="outside"
                    disableSelectorIconRotation
                    selectorIcon={<SelectorIcon />}

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
                />
                <Button
                    fullWidth
                    onClick={handleSubmit}
                >
                    Check Route
                </Button>
            </form>
        </div>
    );
};
