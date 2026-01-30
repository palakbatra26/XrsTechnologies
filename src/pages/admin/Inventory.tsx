import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

const inventory = [
  { sku: "TR-TS-2201", name: "Relaxed Tee", xs: 12, s: 20, m: 18, l: 9, xl: 4, xxl: 2 },
  { sku: "TR-DN-8831", name: "Denim Jacket", xs: 4, s: 6, m: 8, l: 10, xl: 7, xxl: 6 },
  { sku: "TR-SH-7720", name: "Cotton Shirt", xs: 6, s: 10, m: 12, l: 11, xl: 3, xxl: 1 },
];

const lowStockBadge = (value: number) => {
  if (value <= 2) {
    return <Badge variant="destructive">Critical</Badge>;
  }
  if (value <= 5) {
    return <Badge variant="outline">Low</Badge>;
  }
  return <Badge variant="secondary">Healthy</Badge>;
};

export default function AdminInventory() {
  return (
    <div className="space-y-6">
      <PageHeader title="Inventory" description="Monitor size-level stock with XL/XXL alerts." />

      <DataTable
        headers={["SKU", "Product", "XS", "S", "M", "L", "XL", "XXL", "XL Alert", "XXL Alert"]}
        rows={inventory.map((item) => [
          <span className="font-medium text-foreground" key={item.sku}>
            {item.sku}
          </span>,
          item.name,
          item.xs,
          item.s,
          item.m,
          item.l,
          item.xl,
          item.xxl,
          lowStockBadge(item.xl),
          lowStockBadge(item.xxl),
        ])}
      />
    </div>
  );
}
