import { Textarea } from "@nextui-org/react";
import { AdminProps } from "@/components/Table/render-cell";

interface UserDetailsProps {
    adminProps: AdminProps | undefined;
}

const UserDetails = ({ adminProps }: UserDetailsProps) => {
    if (!adminProps) return null;
    const inputFields = [
        { label: "Name:", value: adminProps.name, placeholder: "No User Name" },
        { label: "Email:", value: adminProps.email, placeholder: "No User Mail" },
        { label: "Phone Number:", value: adminProps.contactNo, placeholder: "No Phone Number" },
        { label: "Address:", value: adminProps.address, placeholder: "Address Not Defined" },
        { label: "Gender:", value: adminProps.gender.charAt(0).toUpperCase() + adminProps.gender.slice(1), placeholder: "Gender Not Defined" },
        { label: "Date of Birth:", value: adminProps.dateOfBirth, placeholder: "Date of Birth Not Defined" },
        { label: "Travelled Journeys:", value: adminProps.dateOfBirth, placeholder: "No Travelled Journeys" },
    ];

    return (
        <div className="flex flex-col gap-2">
            {inputFields.map((field, index) => (
                <Textarea
                    key={index}
                    isReadOnly
                    label={field.label}
                    variant="bordered"
                    value={field.value}
                    placeholder={field.placeholder}
                    labelPlacement="outside-left"
                    minRows={1}
                />
            ))}
        </div>
    );
};

export default UserDetails;