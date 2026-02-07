import { useMemo, useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { PageHeader } from "@/components/admin/PageHeader";
import { ImageUploader, ImageItem } from "@/components/admin/ImageUploader";
import { TagInput } from "@/components/admin/TagInput";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/components/ui/use-toast";

const numberField = z.preprocess(
  (value) => (value === "" || value === null ? undefined : Number(value)),
  z.number().min(0, { message: "Must be 0 or more" }),
);

const optionalNumberField = z.preprocess(
  (value) => (value === "" || value === null ? undefined : Number(value)),
  z.number().min(0, { message: "Must be 0 or more" }).optional(),
);

const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.enum(["Men", "Women", "Kids"]),
  subcategory: z.string().min(1, "Subcategory is required"),
  brand: z.string().optional(),
  price: numberField,
  mrp: optionalNumberField,
  stockTotal: numberField,
  stockBySize: z.object({
    xs: numberField,
    s: numberField,
    m: numberField,
    l: numberField,
    xl: numberField,
    xxl: numberField,
  }),
  colors: z.array(z.string().min(1)).min(1, "Add at least one color"),
  description: z.string().min(1, "Product description is required"),
  tags: z.array(z.enum(["New", "Trending", "Best Seller", "Sale"])),
  status: z.enum(["Active", "Draft"]),
});

type ProductFormValues = z.infer<typeof productSchema>;

const defaultValues: ProductFormValues = {
  name: "",
  category: "Men",
  subcategory: "",
  brand: "",
  price: 0,
  mrp: undefined,
  stockTotal: 0,
  stockBySize: { xs: 0, s: 0, m: 0, l: 0, xl: 0, xxl: 0 },
  colors: [],
  description: "",
  tags: [],
  status: "Active",
};

const mockProduct: ProductFormValues = {
  name: "Classic Denim Jacket",
  category: "Men",
  subcategory: "Jackets",
  brand: "Trendora",
  price: 2499,
  mrp: 3299,
  stockTotal: 68,
  stockBySize: { xs: 4, s: 12, m: 18, l: 14, xl: 12, xxl: 8 },
  colors: ["Blue", "Indigo"],
  description: "Heavyweight denim jacket with a classic silhouette and soft lining.",
  tags: ["Trending", "Best Seller"],
  status: "Active",
};

interface ProductFormProps {
  mode: "create" | "edit";
  productId?: string;
}

export function ProductForm({ mode, productId }: ProductFormProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [images, setImages] = useState<ImageItem[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: mode === "edit" ? mockProduct : defaultValues,
  });

  const price = form.watch("price");
  const mrp = form.watch("mrp");

  const discount = useMemo(() => {
    if (!mrp || mrp <= 0) {
      return 0;
    }
    return Math.max(0, Math.round(((mrp - price) / mrp) * 100));
  }, [price, mrp]);

  const toggleTag = (tag: ProductFormValues["tags"][number]) => {
    const current = form.getValues("tags");
    if (current.includes(tag)) {
      form.setValue("tags", current.filter((item) => item !== tag));
      return;
    }
    form.setValue("tags", [...current, tag]);
  };

  const onSubmit = (values: ProductFormValues) => {
    toast({
      title: mode === "edit" ? "Product updated" : "Product created",
      description: "Mock data saved successfully.",
    });
    navigate("/admin/products");
  };

  const handleSaveDraft = () => {
    form.setValue("status", "Draft");
    form.handleSubmit(onSubmit)();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <PageHeader
          title={mode === "edit" ? `Edit Product ${productId ?? ""}` : "Add New Product"}
          description="Keep product details accurate with pricing, inventory, and visuals."
          actions={
            <>
              <Button type="button" variant="secondary" onClick={handleSaveDraft}>
                Save as Draft
              </Button>
              <Button type="button" variant="outline" onClick={() => navigate("/admin/products")}>
                Cancel
              </Button>
              <Button type="submit">Save Product</Button>
            </>
          }
        />

        <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-6">
            <Card className="space-y-5 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Classic Denim Jacket" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Men">Men</SelectItem>
                          <SelectItem value="Women">Women</SelectItem>
                          <SelectItem value="Kids">Kids</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subcategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Subcategory</FormLabel>
                      <FormControl>
                        <Input placeholder="Jackets" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand (optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Trendora Studio" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price (INR)</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3">
                          <span className="text-sm text-muted-foreground">₹</span>
                          <Input type="number" className="border-0 px-0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="mrp"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>MRP (optional)</FormLabel>
                      <FormControl>
                        <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3">
                          <span className="text-sm text-muted-foreground">₹</span>
                          <Input type="number" className="border-0 px-0" {...field} />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <Badge variant="secondary">Discount {discount}%</Badge>
                {mrp ? <span>Calculated from MRP and selling price.</span> : <span>Add MRP to unlock discount.</span>}
              </div>
            </Card>

            <Card className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="text-sm font-semibold text-foreground">Inventory</div>
              <FormField
                control={form.control}
                name="stockTotal"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Total Stock</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid gap-3 sm:grid-cols-3">
                {([
                  ["xs", "XS"],
                  ["s", "S"],
                  ["m", "M"],
                  ["l", "L"],
                  ["xl", "XL"],
                  ["xxl", "XXL"],
                ] as const).map(([key, label]) => (
                  <FormField
                    key={key}
                    control={form.control}
                    name={`stockBySize.${key}`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{label}</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                ))}
              </div>
            </Card>

            <Card className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Description</FormLabel>
                    <FormControl>
                      <Textarea rows={5} placeholder="Describe the fabric, fit, and vibe." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="colors"
                render={({ field }) => (
                  <FormItem>
                    <TagInput label="Colors" value={field.value} onChange={field.onChange} placeholder="Blue, Indigo" />
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>

            <Card className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <ImageUploader images={images} onChange={setImages} />
            </Card>

            <Card className="space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="space-y-2">
                <div className="text-sm font-semibold text-foreground">Tags</div>
                <div className="flex flex-wrap gap-3">
                  {(["New", "Trending", "Best Seller", "Sale"] as const).map((tag) => (
                    <label key={tag} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Checkbox checked={form.watch("tags").includes(tag)} onCheckedChange={() => toggleTag(tag)} />
                      {tag}
                    </label>
                  ))}
                </div>
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select value={field.value} onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Draft">Draft</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </Card>
          </div>

          <div className="space-y-4">
            <Card className="sticky top-24 space-y-4 rounded-3xl border border-border bg-card p-6 shadow-sm">
              <div className="text-sm font-semibold text-foreground">Preview</div>
              <div className="aspect-square w-full overflow-hidden rounded-2xl border border-border bg-muted/40">
                {images[0]?.preview ? (
                  <img src={images[0].preview} alt="Preview" className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-xs text-muted-foreground">
                    Upload an image to preview
                  </div>
                )}
              </div>
              <div>
                <div className="text-base font-semibold text-foreground">{form.watch("name") || "Product name"}</div>
                <div className="text-sm text-muted-foreground">
                  ₹{Number(form.watch("price") || 0).toLocaleString("en-IN")}
                </div>
              </div>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Status</span>
                  <span className="font-medium text-foreground">{form.watch("status")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Colors</span>
                  <span className="font-medium text-foreground">{form.watch("colors").length}</span>
                </div>
              </div>
            </Card>
            <Card className="space-y-2 rounded-3xl border border-border bg-card p-6 text-xs text-muted-foreground shadow-sm">
              <div className="font-semibold text-foreground">Uploader Tips</div>
              <ul className="space-y-1">
                <li>Drag to reorder images.</li>
                <li>First image becomes the cover.</li>
                <li>Use 1-6 images for best results.</li>
              </ul>
            </Card>
          </div>
        </div>
      </form>
    </Form>
  );
}
