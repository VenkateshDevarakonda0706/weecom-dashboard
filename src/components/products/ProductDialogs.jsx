import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAddProduct, useUpdateProduct, useDeleteProduct } from "../../hooks/useProducts";
import { z } from 'zod';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  price: z.number().min(0, 'Price must be non-negative'),
  category: z.string().min(1, 'Category is required'),
  stock: z.number().int().min(0, 'Stock must be non-negative'),
});

export default function ProductDialogs({ type, open, onOpenChange, product }) {
  const [form, setForm] = useState({ title: "", price: "", category: "", stock: "" });
  const [errors, setErrors] = useState({});
  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
  const isLoading = addProduct.isLoading || updateProduct.isLoading || deleteProduct.isLoading;

  useEffect(() => {
    if (type === "edit" && product) {
      setForm({
        title: product.title || "",
        price: product.price?.toString() || "",
        category: product.category || "",
        stock: product.stock?.toString() || ""
      });
    } else if (type === "add") {
      setForm({ title: "", price: "", category: "", stock: "" });
    }
  }, [type, product, open]);

  const handleSubmit = () => {
    if (type === "delete") {
      deleteProduct.mutate(product.id);
      onOpenChange(false);
      return;
    }

    const data = {
      title: form.title,
      price: Number(form.price),
      category: form.category,
      stock: Number(form.stock),
    };
    const result = schema.safeParse(data);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    if (type === "add") {
      addProduct.mutate(data);
    } else if (type === "edit") {
      updateProduct.mutate({ id: product.id, ...data });
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {type === "add" && "Add Product"}
            {type === "edit" && "Edit Product"}
            {type === "delete" && "Delete Product"}
          </DialogTitle>
        </DialogHeader>

        {(type === "add" || type === "edit") && (
          <div className="space-y-4">
            <div>
              <Input
                placeholder="Title"
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title[0]}</p>}
            </div>
            <div>
              <Input
                placeholder="Price"
                type="number"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              {errors.price && <p className="text-red-500 text-sm">{errors.price[0]}</p>}
            </div>
            <div>
              <Input
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              {errors.category && <p className="text-red-500 text-sm">{errors.category[0]}</p>}
            </div>
            <div>
              <Input
                placeholder="Stock"
                type="number"
                value={form.stock}
                onChange={(e) => setForm({ ...form, stock: e.target.value })}
              />
              {errors.stock && <p className="text-red-500 text-sm">{errors.stock[0]}</p>}
            </div>
          </div>
        )}

        {type === "delete" && (
          <p>Are you sure you want to delete {product?.title}?</p>
        )}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? 'Processing...' : (type === "delete" ? "Delete" : "Save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}