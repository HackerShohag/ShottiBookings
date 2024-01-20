import { useState } from "react";
import { Button, Input, Spacer } from "@nextui-org/react";
import { AdminProps } from "@/components/Table/render-cell";

interface UserDetailsProps {
    adminProps: AdminProps | undefined;
    onSubmit: (data: AdminProps) => void;
}

const UserDetailsEdit = ({ adminProps, onSubmit }: UserDetailsProps) => {
    if (!adminProps) return null;
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [formData, setFormData] = useState(adminProps);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
        e.preventDefault();
        setFormData((prevData) => ({
            ...prevData,
            [field]: e.target.value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
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
            ))}
            <Spacer y={1} />
            <Button
                fullWidth
                color="primary"
                onClick={handleSubmit}
            >
                Save Changes
            </Button>
            <Spacer y={2} />
        </div>
    );
};

export default UserDetailsEdit;