import { Link } from "react-router-dom";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const products = [
  { id: "PRD-1001", name: "Classic Denim Jacket", category: "Men", price: "₹2,499", stock: 68, status: "Active" },
  { id: "PRD-1002", name: "Flowy Summer Dress", category: "Women", price: "₹1,899", stock: 42, status: "Active" },
  { id: "PRD-1003", name: "Kids Hoodie Set", category: "Kids", price: "₹1,299", stock: 18, status: "Draft" },
  { id: "PRD-1004", name: "Slim Fit Chinos", category: "Men", price: "₹1,799", stock: 12, status: "Active" },
];

export default function AdminProducts() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Products"
        description="Manage the Trendora catalog with pricing and inventory at a glance."
        actions={
          <Button asChild>
            <Link to="/admin/products/new">Add Product</Link>
          </Button>
        }
      />

      <DataTable
        headers={["Product", "Category", "Price", "Stock", "Status", "Action"]}
        rows={products.map((product) => [
          <div key={product.id}>
            <div className="font-medium text-foreground">{product.name}</div>
            <div className="text-xs text-muted-foreground">{product.id}</div>
          </div>,
          product.category,
          product.price,
          product.stock,
          <Badge variant={product.status === "Active" ? "default" : "secondary"}>{product.status}</Badge>,
          <Button variant="ghost" size="sm" asChild>
            <Link to={`/admin/products/${product.id}/edit`}>Edit</Link>
          </Button>,
        ])}
      />
    </div>
  );
}
