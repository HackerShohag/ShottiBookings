import { User, Tooltip, Chip } from "@nextui-org/react";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

export interface AdminProps {
  bookedJourney: string[];
  id: string;
  name: string;
  user: string;
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: string;
  address: string;
  isDeleted: boolean;
}

interface Props {
  user: AdminProps;
  columnKey: string | React.Key;
  handlers?: {
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onDetails: (id: string) => void;
  };
}


export const RenderCell = ({ user, columnKey, handlers }: Props) => {

  switch (columnKey) {
    case "name":
      return (
        <User
          name={user.name}
        >
          {user.name}
        </User>
      );
    case "email":
      return (
        <div>
          <div>
            <span>{user.email}</span>
          </div>
          <div>
            <span>{user.address}</span>
          </div>
        </div>
      );
    case "role":
      return (
        <Chip
          size="sm"
          variant="flat"
          color="danger"
        >
          <span className="capitalize text-xs">Admin</span>
        </Chip>
      );
    case "status":
      return (
        <Chip
          size="sm"
          variant="flat"
          color={
            user.isDeleted ? "danger" : "success"
          }
        >
          <span className="capitalize text-xs">{user.isDeleted ? "Deteled" : "Active"}</span>
        </Chip>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => handlers?.onDetails(user.id)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit user" color="secondary">
              <button onClick={() => handlers?.onEdit(user.id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete user"
              color="danger"
              onClick={() => handlers?.onDelete(user.id)}
            >
              <button>
                <DeleteIcon size={20} fill="#FF0080" />
              </button>
            </Tooltip>
          </div>
        </div>
      );
  }
};
