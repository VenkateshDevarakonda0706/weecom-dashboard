import { useNavigate } from 'react-router-dom';

export default function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">Weecom Dashboard</h1>
      {/*}
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleLogout}>
        Logout
      </button>
      */}
    </header>
  );
}