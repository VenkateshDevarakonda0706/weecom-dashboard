import { Link, useLocation } from 'react-router-dom';

export default function Sidebar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path ? 'bg-gray-700' : '';

  return (
    <aside className="w-64 bg-gray-900 text-white min-h-screen p-4">
      <h2 className="text-xl font-bold mb-6">Weecom</h2>
      <nav>
        <ul className="space-y-2">
          <li className={`p-2 rounded hover:bg-gray-700 ${isActive('/')}`}>
            <Link to="/">Dashboard</Link>
          </li>
          <li className={`p-2 rounded hover:bg-gray-700 ${isActive('/products')}`}>
            <Link to="/products">Products</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
}