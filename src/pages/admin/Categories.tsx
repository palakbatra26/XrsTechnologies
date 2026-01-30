import { useState } from "react";
import { PageHeader } from "@/components/admin/PageHeader";
import { DataTable } from "@/components/admin/DataTable";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";

type CategoryKey = "Men" | "Women" | "Kids";

type Subcategory = {
  id: string;
  name: string;
};

type CategoryData = {
  title: string;
  description: string;
  banner?: string;
  subcategories: Subcategory[];
};

const initialData: Record<CategoryKey, CategoryData> = {
  Men: {
    title: "Men",
    description: "Everyday essentials and sharp staples for men.",
    banner: "",
    subcategories: [
      { id: "men-1", name: "T-Shirts" },
      { id: "men-2", name: "Shirts" },
      { id: "men-3", name: "Jeans" },
    ],
  },
  Women: {
    title: "Women",
    description: "Seasonal favorites curated for women.",
    banner: "",
    subcategories: [
      { id: "women-1", name: "Dresses" },
      { id: "women-2", name: "Winterwear" },
    ],
  },
  Kids: {
    title: "Kids",
    description: "Playful looks for kids across age groups.",
    banner: "",
    subcategories: [
      { id: "kids-1", name: "Hoodies" },
      { id: "kids-2", name: "Shorts" },
    ],
  },
};

export default function AdminCategories() {
  const [categories, setCategories] = useState(initialData);
  const [activeTab, setActiveTab] = useState<CategoryKey>("Men");
  const [subcategoryName, setSubcategoryName] = useState("");
  const { toast } = useToast();

  const category = categories[activeTab];

  const handleBannerUpload = (file: File | null) => {
    if (!file) {
      return;
    }
    const preview = URL.createObjectURL(file);
    setCategories((prev) => ({
      ...prev,
      [activeTab]: { ...prev[activeTab], banner: preview },
    }));
    toast({ title: "Banner updated", description: "Banner image preview refreshed." });
  };

  const handleAddSubcategory = () => {
    if (!subcategoryName.trim()) {
      return;
    }
    setCategories((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        subcategories: [
          ...prev[activeTab].subcategories,
          { id: crypto.randomUUID(), name: subcategoryName.trim() },
        ],
      },
    }));
    setSubcategoryName("");
    toast({ title: "Subcategory added", description: "New subcategory saved." });
  };

  const handleDelete = (id: string) => {
    setCategories((prev) => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        subcategories: prev[activeTab].subcategories.filter((item) => item.id !== id),
      },
    }));
  };

  return (
    <div className="space-y-6">
      <PageHeader title="Categories" description="Manage main categories, banners, and subcategories." />

      <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as CategoryKey)}>
        <TabsList className="grid w-full grid-cols-3">
          {(["Men", "Women", "Kids"] as CategoryKey[]).map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {tab}
            </TabsTrigger>
          ))}
        </TabsList>

        {(["Men", "Women", "Kids"] as CategoryKey[]).map((tab) => (
          <TabsContent key={tab} value={tab} className="space-y-6">
            <Card className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="space-y-2">
                <Label>Category Title</Label>
                <Input value={categories[tab].title} readOnly />
              </div>
              <div className="space-y-2">
                <Label>Description</Label>
                <Input value={categories[tab].description} readOnly />
              </div>
              <div className="space-y-3">
                <Label>Banner Image</Label>
                <div className="flex flex-wrap items-center gap-4">
                  <div className="h-28 w-44 overflow-hidden rounded-2xl border border-border bg-muted/40">
                    {categories[tab].banner ? (
                      <img src={categories[tab].banner} alt="Banner" className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                        No banner
                      </div>
                    )}
                  </div>
                  <Input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={(event) => handleBannerUpload(event.target.files?.[0] ?? null)}
                  />
                </div>
              </div>
            </Card>

            <Card className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold text-foreground">Subcategories</div>
                  <div className="text-xs text-muted-foreground">Edit, add, or remove subcategories.</div>
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="secondary">Add Subcategory</Button>
                  </DialogTrigger>
                  <DialogContent className="rounded-2xl">
                    <DialogHeader>
                      <DialogTitle>Add Subcategory</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          value={subcategoryName}
                          onChange={(event) => setSubcategoryName(event.target.value)}
                          placeholder="T-Shirts"
                        />
                      </div>
                      <Button onClick={handleAddSubcategory}>Save</Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <DataTable
                headers={["Subcategory", "Action"]}
                rows={category.subcategories.map((item) => [
                  item.name,
                  <Button key={item.id} variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>,
                ])}
              />
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
