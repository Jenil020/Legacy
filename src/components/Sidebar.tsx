"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import { navLinks } from "@/lib/nav-links";
import { useSidebar } from "./SidebarContext";

interface SidebarProps {
  onSubmenuClick?: (key: string) => void;
}

export function Sidebar({ onSubmenuClick }: SidebarProps) {
  const [openSubmenus, setOpenSubmenus] = useState<Record<string, boolean>>({});
  const [modalMenu, setModalMenu] = useState<typeof navLinks[0] | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { isCollapsed, toggleCollapse } = useSidebar();

  const toggleSubmenu = (title: string) => {
    setOpenSubmenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const SidebarContent = (
    <div
      className={`transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-16" : "w-46"
      } bg-[#e6eaee] border-r border-gray-200 flex flex-col h-screen shadow-md`}
    >
      {/* Collapse Button */}
     <div className="p-3 flex justify-end hidden md:flex">
        <button
          onClick={toggleCollapse}
          className="p-2 rounded-full hover:bg-gray-200 transition"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>


      {/* Nav Links */}
      <nav className="flex-1 px-2 pt-1 pb-6 overflow-y-auto text-sm text-gray-800 font-medium space-y-1">
        {navLinks.map((item) => (
          <div key={item.title}>
            {item.submenu ? (
              isCollapsed ? (
                <button
                  onClick={() => setModalMenu(item)}
                  className="w-full p-3 flex justify-center hover:bg-gray-200 rounded-lg transition"
                  title={item.title}
                >
                  {item.icon && <item.icon size={20} className="text-gray-700" />}
                </button>
              ) : (
                <>
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gray-200 transition"
                  >
                    <div className="flex items-center gap-3">
                      {item.icon && (
                        <item.icon size={18} className="text-gray-700" />
                      )}
                      <span>{item.title}</span>
                    </div>
                    {openSubmenus[item.title] ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  <div
                    className={`transition-all duration-300 overflow-hidden ${
                      openSubmenus[item.title] ? "max-h-40" : "max-h-0"
                    }`}
                  >
                    {item.submenu.map((sub) => (
                      <Link key={sub.title} href={sub.href}>
                        <div className="ml-9 mt-1 py-1.5 px-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-md transition cursor-pointer text-[13px]">
                          {sub.title}
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              )
            ) : (
              <Link href={item.href}>
                <div
                  className={`flex items-center px-3 py-2 rounded-lg hover:bg-gray-200 transition cursor-pointer ${
                    isCollapsed ? "justify-center" : "gap-3"
                  }`}
                  title={item.title}
                >
                  {item.icon && (
                    <item.icon size={18} className="text-gray-700" />
                  )}
                  {!isCollapsed && <span>{item.title}</span>}
                </div>
              </Link>
            )}
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex fixed top-0 left-0 h-screen z-50">
        {SidebarContent}
      </aside>

      {/* Mobile Menu Button */}
      <div className="sm:hidden fixed top-3 left-3 z-50">
      <button
  className="sm:hidden fixed top-3 left-3 z-50 bg-white p-2 rounded-md shadow-md w-10 h-10 flex items-center justify-center"
  onClick={() => setMobileOpen(true)}
>
  <Menu size={22} />
</button>
      </div>

      {/* Mobile Sidebar Drawer */}
{mobileOpen && (
  <>
    {/* Overlay */}
    <div
      className="fixed inset-0 z-40 bg-black/40"
      onClick={() => setMobileOpen(false)}
    />

    {/* Sidebar Content */}
    <div className="fixed top-0 left-0 w-50 h-screen z-50 bg-[#e6eaee] shadow-lg overflow-y-auto">
      
      {/* Close Button Row */}
      <div className="p-3 pt-1 flex justify-end">
        <button
          onClick={() => setMobileOpen(false)}
          className="p-0 rounded-full hover:bg-gray-200 transition w-9 h-9 flex items-center justify-center"
        >
          <X size={20} />
        </button>
      </div>

      {/* Sidebar Navigation */}
      <div className="px-2">
        {SidebarContent}
      </div>
    </div>
  </>
)}

      {/* Collapsed Submenu Modal */}
      {modalMenu && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20"
            onClick={() => setModalMenu(null)}
          />
          <div className="fixed left-[4.5rem] top-24 z-50 bg-white rounded-xl shadow-xl w-64 border text-sm text-gray-800 overflow-hidden max-w-[90vw]">
            {modalMenu.submenu?.map((sub) => (
              <Link key={sub.title} href={sub.href}>
                <div
                  onClick={() => setModalMenu(null)}
                  className="flex justify-between items-center px-4 py-3 hover:bg-gray-100 border-b last:border-b-0 cursor-pointer transition"
                >
                  <span>{sub.title}</span>
                  <span className="text-gray-400 text-lg font-bold">+</span>
                </div>
              </Link>
            ))}
          </div>
        </>
      )}
    </>
  );
}
