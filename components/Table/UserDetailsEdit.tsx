import { useState } from "react";
import { Button, Input, Spacer, Select, SelectItem } from "@nextui-org/react";
import { AdminProps } from "@/components/Table/render-cell";

interface UserDetailsProps {
    adminProps: AdminProps | undefined;
    onSubmit: (data: AdminProps) => boolean | Promise<boolean>;
}

const UserDetailsEdit = ({ adminProps, onSubmit }: UserDetailsProps) => {
    if (!adminProps) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState(adminProps);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [isLoading, setIsLoading] = useState(false);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [success, setSuccess] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: string) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    const handleSubmit = async () => {
        setIsLoading(true);
        const response = await onSubmit(formData);
        setIsLoading(false);
        if (response) {
            setSuccess(true);
        }
    };

    const inputFields = [
        { label: "Name:", value: formData.name, placeholder: "No User Name", field: "name" },
        { label: "Email:", value: formData.email, placeholder: "No User Mail", field: "email" },
        { label: "Phone Number:", value: formData.contactNo, placeholder: "No Phone Number", field: "contactNo" },
        { label: "Address:", value: formData.address, placeholder: "Address Not Defined", field: "address" },
        { label: "Gender:", value: formData.gender.charAt(0).toUpperCase() + formData.gender.slice(1), placeholder: "Gender Not Defined", field: "gender" },
        { label: "Date of Birth:", value: formData.dateOfBirth, placeholder: "Date of Birth Not Defined", field: "dateOfBirth" },
        { label: "Travelled Journeys:", value: formData.dateOfBirth, placeholder: "No Travelled Journeys", field: "travelledJourneys" },
    ];

    return (
        <div className="flex flex-col gap-2 w-full">
            {inputFields.map((field, index) => (
                field.field === 'gender' ? (
                    <Select
                        key={index}
                        label="Gender:"
                        placeholder="Select Gender"
                        labelPlacement="outside-left"
                        className="max-w-xs"
                        disableSelectorIconRotation
                        value={field.value}
                        onChange={(e) => handleInputChange(e, field.field)}
                    >
                        <SelectItem key='male' value="male">Male</SelectItem>
                        <SelectItem key='fmale' value="fmale">Female</SelectItem>
                        <SelectItem key='other' value="other">Other</SelectItem>
                    </Select>
                ) : (
                    <Input
                        fullWidth
                        className="w-full"
                        key={index}
                        label={field.label}
                        variant="bordered"
                        value={field.value}
                        placeholder={field.placeholder}
                        labelPlacement="outside-left"
                        onChange={(e) => handleInputChange(e, field.field)}
                    />
                )
            ))}
            <Spacer y={1} />
            <Button
                fullWidth
                color="primary"
                onClick={handleSubmit}
                disabled={isLoading}
                isLoading={isLoading}
            >
                Save Changes
            </Button>
        </div>
    );
};

export default UserDetailsEdit;