import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

/*
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" />;
}
  */

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Protected routes (commented for now) */}
        {/*
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/products" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/products" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;