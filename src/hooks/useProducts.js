import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import toast from 'react-hot-toast';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export function useProducts({ limit = 10, skip = 0, search = "" } = {}) {
  return useQuery({
    queryKey: ["products", { limit, skip, search }],
    queryFn: async () => {
      let url = `${API_BASE}/products?limit=${limit}&skip=${skip}`;
      if (search) url += `&q=${encodeURIComponent(search)}`;
      const { data } = await axios.get(url);
      return data;
    },
    onError: () => toast.error('Failed to fetch products'),
  });
}

export function useAddProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newProduct) => {
      const { data } = await axios.post(`${API_BASE}/products/add`, newProduct);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success('Product added');
    },
    onError: () => toast.error('Failed to add product'),
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, ...updates }) => {
      const { data } = await axios.put(`${API_BASE}/products/${id}`, updates);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success('Product updated');
    },
    onError: () => toast.error('Failed to update product'),
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id) => {
      const { data } = await axios.delete(`${API_BASE}/products/${id}`);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      toast.success('Product deleted');
    },
    onError: () => toast.error('Failed to delete product'),
  });
}   