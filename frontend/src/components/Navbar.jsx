import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import NotificationsDropdown from "./NotificacionesDropdown";

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
    <nav className="bg-green-600 text-white px-6 py-4 shadow-md flex justify-between items-center">
      <h1 className="text-xl font-bold">Gestor Escolar</h1>

      <div className="flex gap-4">
        {user && (
          <div className="flex justify-between items-center gap-5">
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <Link to="/estadistica" className="hover:underline">
              Estadísticas
            </Link>
            <div className="flex justify-between items-center text-white">
              <NotificationsDropdown />
            </div>
            <button
              onClick={handleLogout}
              className="bg-white text-green-600 px-3 py-1 rounded hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        )}
        {!user && <Link to="/">Login</Link>}
      </div>
    </nav>
  );
};

export default Navbar;
