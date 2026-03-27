import { useNavigate } from "react-router-dom";
import  useAuth  from "../hooks/useAuth";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-16 bg-gray-800/80 backdrop-blur-md shadow-md z-50 flex justify-between items-center px-6">
      
      <h1 className="text-xl font-bold text-blue-400">
        ExpenseTracker
      </h1>

      <button
        onClick={handleLogout}
        className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;