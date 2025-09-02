import { useState } from "react";
import { useProducts } from "../../hooks/useProducts";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import ProductDialogs from "./ProductDialogs";

export default function ProductTable() {
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [dialog, setDialog] = useState({ open: false, type: null, product: null });
  const limit = 10;
  const skip = page * limit;
  const { data, isLoading, isError } = useProducts({ limit, skip, search });

  const categories = data?.products ? Array.from(new Set(data.products.map(p => p.category))) : [];
  const filteredProducts = (category && category !== "all")
    ? data?.products?.filter(p => p.category === category)
    : data?.products;

  const handlePrev = () => setPage((p) => Math.max(p - 1, 0));
  const handleNext = () => {
    if (data && skip + limit < data.total) setPage((p) => p + 1);
  };

  const openDialog = (type, product = null) => setDialog({ open: true, type, product });
  const closeDialog = () => setDialog({ open: false, type: null, product: null });

  const handleClear = () => {
    setSearch("");
    setCategory("");
    setPage(0);
  };

  return (
    <div>
      <div className="flex items-center mb-4 gap-2">
        <Input
          placeholder="Search products..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(0); }}
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            {/* Radix Select requires non-empty values for SelectItem; use 'all' as sentinel */}
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map(cat => (
              <SelectItem key={cat} value={cat}>{cat}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleClear}>Clear Filters</Button>
        <Button onClick={() => openDialog("add")}>Add Product</Button>
      </div>
      <div className="mb-2 text-sm text-gray-600">
        Total Products: {data?.total || 0} | Showing {filteredProducts?.length || 0} on this page
      </div>
      {isLoading ? (
        <Skeleton className="h-[400px] w-full" />
      ) : isError ? (
        <p className="p-4 text-red-500">Error loading products.</p>
      ) : filteredProducts?.length === 0 ? (
        <p className="p-4">No products found.</p>
      ) : (
        <div>
          <table className="w-full border border-gray-300 rounded-lg overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 text-left">Title</th>
                <th className="px-4 py-2 text-left">Price</th>
                <th className="px-4 py-2 text-left">Category</th>
                <th className="px-4 py-2 text-left">Stock</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{p.title}</td>
                  <td className="px-4 py-2">${p.price}</td>
                  <td className="px-4 py-2">{p.category}</td>
                  <td className="px-4 py-2">{p.stock}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button variant="outline" onClick={() => openDialog("edit", p)}>Edit</Button>
                    <Button variant="destructive" onClick={() => openDialog("delete", p)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-between items-center mt-4">
            <Button onClick={handlePrev} disabled={page === 0}>Previous</Button>
            <span>Page {page + 1} of {Math.ceil((data?.total || 0) / limit)}</span>
            <Button onClick={handleNext} disabled={skip + limit >= (data?.total || 0)}>Next</Button>
          </div>
        </div>
      )}
      <ProductDialogs
        type={dialog.type}
        open={dialog.open}
        onOpenChange={closeDialog}
        product={dialog.product}
      />
    </div>
  );
}