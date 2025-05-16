"use client";

import { PageWrapper } from "@/components/PageWrapper";
import "./globals.css";
import { ReactNode, useState } from "react";
import { usePathname } from 'next/navigation';
import { Sidebar } from "@/components/Sidebar";
import { SidebarProvider } from "@/components/SidebarContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isSigninPage = pathname === "/signin";

  const [isAddItemOpen, setAddItemOpen] = useState(false);
  const [isGroupDrawerOpen, setGroupDrawerOpen] = useState(false);

  const handleSubmenuClick = (key: string) => {
    setAddItemOpen(false);
    setGroupDrawerOpen(false);

    if (key === 'add-item') setAddItemOpen(true);
    if (key === 'item-group') setGroupDrawerOpen(true);
  };

  return (
    <html lang="en">
      <head />
      <body className="relative flex h-screen overflow-hidden">
         <SidebarProvider>
        {/* Sidebar: hidden on /signin */}
        {!isSigninPage && <Sidebar onSubmenuClick={handleSubmenuClick} />}

        {/* Page wrapper adjusts based on sidebar */}
        {!isSigninPage ? (
          <PageWrapper>{children}</PageWrapper>
        ) : (
          <div className="w-full">{children}</div>
        )}
        </SidebarProvider>
      </body>
    </html>
  );
}
