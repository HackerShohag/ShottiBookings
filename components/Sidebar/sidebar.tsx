'use client';

import { useSession } from "next-auth/react";

import { OperatorSidebarWrapper } from "./OperatorSidebar";
import { AdminSidebarWrapper } from "./AdminSidebar";
import { ModeratorSidebarWrapper } from "./ModeratorSidebar";
import { usePathname } from "next/navigation";

export default function SidebarWrapper() {
  const { data: session } = useSession();
  const pathname = usePathname();

  return (
    <> {pathname.includes("admin") && session?.user.role === "admin" ?
      <AdminSidebarWrapper /> : pathname.includes("operator") && session?.user.role === "operator" ?
        <OperatorSidebarWrapper /> : pathname.includes("moderator") && session?.user.role === "moderator" ?
          <ModeratorSidebarWrapper /> : null
    }
    </>
  )
}
