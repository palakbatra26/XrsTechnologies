import { useMemo, useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const orders = [
  { id: "TR-8451", customer: "Ayesha Mehta", status: "Pending", total: "₹3,299", items: 3 },
  { id: "TR-8450", customer: "Rohit Kapoor", status: "Delivered", total: "₹2,150", items: 2 },
  { id: "TR-8449", customer: "Neha Sharma", status: "Shipped", total: "₹5,799", items: 4 },
  { id: "TR-8448", customer: "Arjun Singh", status: "Cancelled", total: "₹1,999", items: 1 },
  { id: "TR-8447", customer: "Sneha Roy", status: "Returned", total: "₹2,799", items: 2 },
];

const statusVariant = (status: string) => {
  switch (status) {
    case "Delivered":
      return "default";
    case "Shipped":
      return "secondary";
    case "Pending":
      return "outline";
    case "Cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

export default function AdminOrders() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    return orders.filter((order) => {
      const matchesSearch =
        order.id.toLowerCase().includes(search.toLowerCase()) ||
        order.customer.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === "All" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [search, statusFilter]);

  return (
    <div className="space-y-6">
      <PageHeader title="Orders" description="Track order status and fulfillments." />

      <div className="flex flex-wrap items-center gap-3">
        <Input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search order ID or customer"
          className="w-full md:w-80"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Shipped">Shipped</SelectItem>
            <SelectItem value="Delivered">Delivered</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
            <SelectItem value="Returned">Returned</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <DataTable
        headers={["Order", "Customer", "Items", "Status", "Total"]}
        rows={filtered.map((order) => [
          <span className="font-medium text-foreground" key={order.id}>
            {order.id}
          </span>,
          order.customer,
          order.items,
          <Badge variant={statusVariant(order.status) as "default" | "secondary" | "outline" | "destructive"}>
            {order.status}
          </Badge>,
          order.total,
        ])}
      />
    </div>
  );
}
