'use client';

import { useSession } from "next-auth/react";

import { OperatorSidebarWrapper } from "./OperatorSidebar";
import { AdminSidebarWrapper } from "./AdminSidebar";
import { ModeratorSidebarWrapper } from "./ModeratorSidebar";
import { usePathname } from "next/navigation";

export default function SidebarWrapper() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  session?.user.role === "admin";
  session?.user.role === "operator";
  session?.user.role === "moderator";

  return (
    <> {pathname.includes("admin") && true ?
      <AdminSidebarWrapper /> : pathname.includes("operator") && true ?
        <OperatorSidebarWrapper /> : pathname.includes("moderator") && true ?
          <ModeratorSidebarWrapper /> : null
    }
    </>
  )
}
