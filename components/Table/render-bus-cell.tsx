import { User, Tooltip, Chip } from "@nextui-org/react";
import { BusType } from "@/types";
import React from "react";
import { DeleteIcon } from "../icons/table/delete-icon";
import { EditIcon } from "../icons/table/edit-icon";
import { EyeIcon } from "../icons/table/eye-icon";

interface Props {
  user: BusType;
  columnKey: string | React.Key;
  handlers?: {
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
    onDetails: (id: string) => void;
  };
  userType: string;
}


export const RenderBusCell = ({ user, columnKey, handlers, userType }: Props) => {

  switch (columnKey) {
    case "companyName":
      return (
        <User
          name={user.companyName}
        >
          {user.companyName}
        </User>
      );
    case "no":
      return (
        <span>{user.no}</span>
      );
    case "capacity":
      return (
        <span>{user.capacity}</span>
      );

    case "actions":
      return (
        <div className="flex items-center gap-4 ">
          <div>
            <Tooltip content="Details">
              <button onClick={() => handlers?.onDetails(user._id)}>
                <EyeIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip content="Edit user" color="secondary">
              <button onClick={() => handlers?.onEdit(user._id)}>
                <EditIcon size={20} fill="#979797" />
              </button>
            </Tooltip>
          </div>
          <div>
            <Tooltip
              content="Delete user"
              color="danger"
              onClick={() => handlers?.onDelete(user._id)}
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
