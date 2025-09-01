import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import axios from 'axios';
import toast from 'react-hot-toast';

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import ProductTable from "../components/products/ProductTable";


const API_BASE = import.meta.env.VITE_API_BASE_URL;
/*
export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(`${API_BASE}/auth/login`, credentials);
      localStorage.setItem('token', data.token);
      toast.success('Logged in');
      navigate('/');
    } catch {
      toast.error('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Login to Weecom Dashboard</h2>
        <Input
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          className="mb-4"
        />
        <Input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          className="mb-4"
        />
        <Button onClick={handleLogin} className="w-full">Login</Button>
      </div>
    </div>
  );
}
  */
 export default function Dashboard() {
  return (
    <div className="flex min-h-screen">
      <div className="hidden md:block">
        <Sidebar />
      </div>
      <div className="flex-1">
        <Header />
        <main className="p-6 max-w-7xl mx-auto">
          <ProductTable />
        </main>
      </div>
    </div>
  );
}