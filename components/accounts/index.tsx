"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { ExportIcon } from "@/components/icons/accounts/export-icon";
import { AddUser } from "@/components/accounts/add-user";
import { AddBus } from "@/components/accounts/add-bus";
import { MemberTable } from "@/components/Table/MemberTable";
import { BusTable } from "@/components/Table/BusTable";

interface AccountsProps {
  userType: string;
}

export const Accounts = (props: AccountsProps) => {
  return (
    <div className="my-14 lg:px-6 max-w-[95rem] mx-auto w-full flex flex-col gap-4">
      <h3 className="text-xl font-semibold">All {`${props.userType.charAt(0).toUpperCase()}${props.userType.slice(1)}`}</h3>
      <div className="flex justify-between flex-wrap gap-4 items-center">
        <div className="flex items-center gap-3 flex-wrap md:flex-nowrap">
          <Input
            classNames={{
              input: "w-full",
              mainWrapper: "w-full",
            }}
            placeholder="Search account"
          />
        </div>
        <div className="flex flex-row gap-3.5 flex-wrap">
          {
            props.userType === 'bus' ?
              <AddBus /> :
              <AddUser userType={props.userType} />
          }
          <Button color="primary" startContent={<ExportIcon />}>
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="max-w-[95rem] mx-auto w-full">
        {
          props.userType === 'bus' ?
            <BusTable userType={props.userType} /> :
            <MemberTable userType={props.userType} />
        }
      </div>
    </div>
  );
};
