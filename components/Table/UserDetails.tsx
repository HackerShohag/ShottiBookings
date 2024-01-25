import { Textarea } from "@nextui-org/react";
import { MemberType } from "@/types";

interface UserDetailsProps {
    userProps: MemberType | undefined;
}

const UserDetails = (props: UserDetailsProps) => {
    if (!props.userProps) return null;
    const inputFields = [
        { label: "Name:", value: props.userProps.name, placeholder: "No User Name" },
        { label: "Email:", value: props.userProps.email, placeholder: "No User Mail" },
        { label: "Phone Number:", value: props.userProps.contactNo, placeholder: "No Phone Number" },
        { label: "Gender:", value: props.userProps.gender.charAt(0).toUpperCase() + props.userProps.gender.slice(1), placeholder: "Gender Not Defined" },
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