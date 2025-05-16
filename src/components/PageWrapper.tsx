import { Navbar } from "@/components/Navbar";
import { useSidebar } from "./SidebarContext";

export function PageWrapper({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`flex flex-col flex-1 h-screen overflow-hidden bg-[#f4f6f8] transition-all duration-300 ease-in-out
        ${isCollapsed ? "sm:ml-16" : "sm:ml-[184px]"}
      `}
    >
      <Navbar />
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
