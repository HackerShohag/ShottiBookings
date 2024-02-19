'use client';

import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Card, CircularProgress, Tooltip } from "@nextui-org/react";
import { HomeIcon } from "../icons/sidebar/home-icon";
import { AccountsIcon, ScheduleIcon } from "@/components/icons";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export const ModeratorSidebarWrapper = () => {
  const pathname = usePathname();
  const session = useSession();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-0 sticky top-0" style={{ height: "0vh" }}>
      {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        {
          session?.data?.user?.role === "moderator" ? (
            <>
              <Card className="flex flex-row gap-2 p-2">
                <Avatar name="MOD" />
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
                  <SidebarMenu title="Moderator Options">
                    <SidebarItem
                      title="Profile"
                      icon={<AccountsIcon />}
                      href="/profile"
                    />
                    <SidebarItem
                      isActive={pathname === "/moderator/dashboard/routes"}
                      href="/moderator/dashboard/routes"
                      title="Add Route"
                      icon={<ScheduleIcon />}
                    />
                    <SidebarItem
                      isActive={pathname === "/moderator/dashboard/operators"}
                      title="Operators"
                      href="/moderator/dashboard/operators"
                      icon={<ScheduleIcon />}
                    />
                    <SidebarItem
                      isActive={pathname === "/moderator/dashboard/buses"}
                      href="/moderator/dashboard/buses"
                      title="Buses"
                      icon={<ScheduleIcon />}
                    />
                  </SidebarMenu>
                </div>
              </div></>
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
