import { PageHeader } from "@/components/admin/PageHeader";
import { StatCard } from "@/components/admin/StatCard";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

const recentOrders = [
  { id: "TR-8451", customer: "Ayesha Mehta", status: "Pending", total: "₹3,299" },
  { id: "TR-8450", customer: "Rohit Kapoor", status: "Delivered", total: "₹2,150" },
  { id: "TR-8449", customer: "Neha Sharma", status: "Shipped", total: "₹5,799" },
  { id: "TR-8448", customer: "Arjun Singh", status: "Cancelled", total: "₹1,999" },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Delivered":
      return "default";
    case "Shipped":
      return "secondary";
    case "Pending":
      return "outline";
    default:
      return "destructive";
  }
};

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <PageHeader title="Dashboard" description="Track today's momentum across orders, revenue, and inventory." />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Orders" value={128} />
        <StatCard label="Revenue" value={485900} prefix="₹" />
        <StatCard label="Products" value={1420} />
        <StatCard label="Users" value={9360} />
      </div>

      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className="mb-3 text-sm font-semibold text-foreground">Recent Orders</h2>
          <DataTable
            headers={["Order", "Customer", "Status", "Total"]}
            rows={recentOrders.map((order) => [
              <span className="font-medium text-foreground" key={order.id}>
                {order.id}
              </span>,
              order.customer,
              <Badge variant={statusVariant(order.status) as "default" | "secondary" | "outline" | "destructive"}>
                {order.status}
              </Badge>,
              order.total,
            ])}
          />
        </div>
        <div className="space-y-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-foreground">Quick Insights</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            <div className="flex items-center justify-between">
              <span>Low stock alerts</span>
              <span className="font-medium text-foreground">12 items</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Pending returns</span>
              <span className="font-medium text-foreground">4 requests</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Coupons expiring</span>
              <span className="font-medium text-foreground">3 today</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
