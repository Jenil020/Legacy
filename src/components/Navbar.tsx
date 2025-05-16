"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { Bell } from "lucide-react";
import { UserSidebar } from "./UserSidebar";
import { UserAvatar } from "./UserAvatar";

export function Navbar() {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getPageTitle = (path: string) => {
    // Exact matches
    const exactMatches: Record<string, string> = {
      "/account/create-account": "Create Account",
      "/account/list-account": "List Account",
      "/dashboard": "Dashboard",
      "/": "Dashboard",
      "/sales/sales-invoice": "Sales Invoice",
      "/sales/quotation": "Quotation",
      "/firm/create-firm": "Add Company",
      "/firm/list-firm": "Company list",
      "/transaction/payment": "Create Payment",
      "/transaction/payment/list": "Payment list",
      "/transaction/journal": "New Journal",
      "/transaction/journal/list": "Journal List",
      "/transaction/contra": "New contra Entry",
      "/transaction/contra/list": "contra Entry List",
      "/expense/create-expense": "Create Expense"
    };

    // Check exact matches first
    if (path in exactMatches) {
      return exactMatches[path];
    }

    // Check for edit payment route pattern
    if (path.startsWith("/transaction/payment/")) {
      return "Edit Payment";
    }
    if (path.startsWith("/transaction/journal/")) {
      return "Edit Journal";
    }
    if (path.startsWith("/transaction/contra/")) {
      return "Edit Contra";
    }
    if (path.startsWith("/expense")) {
      return "Edit Expense";
    }

    // Default fallback
    return "Munim ERP";
  };

  const pageTitle = getPageTitle(pathname || "");

  return (
    <header className="h-[56px] px-6 flex items-center justify-between bg-[#f4f6f8]">
      <div className="text-lg font-semibold text-gray-800 tracking-wide capitalize pl-12 sm:pl-0">
        {pageTitle}
      </div>

      <div className="flex items-center gap-4">
        <button 
          className="relative p-2 rounded-full hover:bg-gray-200 transition"
          aria-label="Notifications"
        >
          <Bell size={18} className="text-gray-600" />
        </button>

        <div onClick={() => setIsSidebarOpen(true)} className="cursor-pointer">
            <UserAvatar />
          </div>
      </div>
       <UserSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </header>
  );
}