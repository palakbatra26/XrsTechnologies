import { NavLink } from "@/components/NavLink";
import { cn } from "@/lib/utils";
import {
  BadgePercent,
  Boxes,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Tags,
  Warehouse,
} from "lucide-react";

const navItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Categories", href: "/admin/categories", icon: Tags },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Coupons", href: "/admin/coupons", icon: BadgePercent },
  { label: "Inventory", href: "/admin/inventory", icon: Warehouse },
];

export function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <nav className="space-y-1">
      {navItems.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          onClick={onNavigate}
          className={cn(
            "flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
          )}
          activeClassName="bg-muted text-foreground"
        >
          <item.icon className="h-4 w-4" />
          <span>{item.label}</span>
        </NavLink>
      ))}
      <div className="mt-4 rounded-xl border border-dashed border-border bg-muted/30 px-3 py-3 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <Boxes className="h-4 w-4" />
          Inventory alerts enabled
        </div>
      </div>
    </nav>
  );
}
