import { useState } from "react";
import { Outlet } from "react-router-dom";
import { SidebarNav } from "./SidebarNav";
import { Topbar } from "./Topbar";
import { Sheet, SheetContent } from "@/components/ui/sheet";

export function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/30">
      <Topbar onOpenSidebar={() => setIsSidebarOpen(true)} />
      <div className="flex">
        <aside className="hidden w-64 border-r border-border bg-background px-4 py-6 lg:block">
          <SidebarNav />
        </aside>
        <main className="flex-1 px-4 py-6 lg:px-8">
          <Outlet />
        </main>
      </div>

      <Sheet open={isSidebarOpen} onOpenChange={setIsSidebarOpen}>
        <SheetContent side="left" className="w-72 px-4 py-6">
          <div className="mb-6 text-lg font-semibold">Trendora Admin</div>
          <SidebarNav onNavigate={() => setIsSidebarOpen(false)} />
        </SheetContent>
      </Sheet>
    </div>
  );
}
