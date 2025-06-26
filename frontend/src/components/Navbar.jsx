import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";

const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    if (user) {
      logout();
      navigate("/"); // te lleva al login
    } else {
      navigate("/"); // si ya no había sesión igual te lleva
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Gestor Escolar</h1>

      <div className="flex gap-4">
        {user && (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/estadistica" className="hover:underline">
              Estadísticas
            </Link>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </>
        )}
        {!user && <Link to="/">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
