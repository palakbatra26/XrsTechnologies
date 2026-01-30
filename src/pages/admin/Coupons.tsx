import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Badge } from "@/components/ui/badge";

const coupons = [
  { code: "TREND10", type: "Percent", value: "10%", minCart: "₹1,500", expiry: "2026-03-20" },
  { code: "NEW500", type: "Flat", value: "₹500", minCart: "₹3,000", expiry: "2026-02-18" },
  { code: "SALE25", type: "Percent", value: "25%", minCart: "₹4,500", expiry: "2026-02-01" },
];

export default function AdminCoupons() {
  return (
    <div className="space-y-6">
      <PageHeader title="Coupons" description="Create and monitor active promotional codes." />

      <DataTable
        headers={["Code", "Type", "Discount", "Min Cart", "Expiry"]}
        rows={coupons.map((coupon) => [
          <span className="font-medium text-foreground" key={coupon.code}>
            {coupon.code}
          </span>,
          <Badge variant={coupon.type === "Flat" ? "secondary" : "outline"}>{coupon.type}</Badge>,
          coupon.value,
          coupon.minCart,
          coupon.expiry,
        ])}
      />
    </div>
  );
}
