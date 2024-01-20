'use client';

import { useSession } from "next-auth/react";

import { OperatorSidebarWrapper } from "./OperatorSidebar";
import { AdminSidebarWrapper } from "./AdminSidebar";
import { usePathname } from "next/navigation";

export default function SidebarWrapper() {
  const { data: session, status } = useSession();
  const pathname = usePathname();

  session?.user.role === "admin";
  session?.user.role === "operator";

  return (
    <> {pathname.includes("admin") && true ?
      <AdminSidebarWrapper /> : pathname.includes("operator") && true ?
        <OperatorSidebarWrapper /> : null
    }
    </>
  )
}
