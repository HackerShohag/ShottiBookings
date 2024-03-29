'use client';

import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Button, Card, CardBody, CardFooter, CardHeader, CircularProgress, Tooltip } from "@nextui-org/react";
import { CompaniesDropdown } from "./companies-dropdown";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { PaymentsIcon } from "../icons/sidebar/payments-icon";
import { BalanceIcon } from "../icons/sidebar/balance-icon";
import { AccountsIcon } from "@/components/icons";
import { CustomersIcon } from "../icons/sidebar/customers-icon";
import { ProductsIcon } from "../icons/sidebar/products-icon";
import { ReportsIcon } from "../icons/sidebar/reports-icon";
import { DevIcon } from "../icons/sidebar/dev-icon";
import { ViewIcon } from "../icons/sidebar/view-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { CollapseItems } from "./collapse-items";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { FilterIcon } from "../icons/sidebar/filter-icon";
import { useSidebarContext } from "../layout/layout-context";
import { ChangeLogIcon } from "../icons/sidebar/changelog-icon";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const AdminSidebarWrapper = () => {
  const pathname = usePathname();
  const session = useSession();

  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[202] sticky top-0" style={{ height: "0vh" }}>
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        {session.data?.user?.role === "admin" ? (
          <>
            <Card className="flex flex-row gap-2 p-2">
              <Avatar name="ADMIN" />
              <div className="flex flex-col">
                <p className="text-sm text-gray-500 font-medium mt-2">
                  {session.data?.user?.name}
                </p>
              </div>
            </Card>
            <div className="flex flex-col justify-between h-full">
              <div className={Sidebar.Body()}>
                <SidebarItem
                  title="Home"
                  icon={<HomeIcon />}
                  isActive={pathname === "/"}
                  href="/"
                />
                <SidebarMenu title="Main Menu">
                  <SidebarItem
                    isActive={pathname === "/profile"}
                    title="Profile"
                    icon={<AccountsIcon />}
                    href="/profile"
                  />
                  <SidebarItem
                    isActive={pathname === ""}
                    title="Admins"
                    icon={<CustomersIcon />}
                    href="/admin/dashboard/admins"
                  />
                  <SidebarItem
                    isActive={pathname === ""}
                    title="Operators"
                    icon={<PaymentsIcon />}
                    href="/admin/dashboard/operators"
                  />
                  <SidebarItem
                    isActive={pathname === ""}
                    title="Buses"
                    icon={<ViewIcon />}
                    href="/admin/dashboard/buses"
                  />
                  <SidebarItem
                    isActive={pathname === ""}
                    title="Bus Schedules"
                    icon={<ProductsIcon />}
                    href="/admin/dashboard/schedules"
                  />
                  <SidebarItem
                    isActive={pathname === ""}
                    title="Drivers"
                    icon={<FilterIcon />}
                    href="/admin/dashboard/schedules"
                  />
                </SidebarMenu>
              </div>
            </div>
          </>
        ) : (
          <div className="flex justify-center align-middle content-center h-screen">
            <CircularProgress className="content-center align-middle" color="primary" size="lg" aria-label="Loading..." />
          </div>
        )
        }
      </div>
    </aside>
  );
};
