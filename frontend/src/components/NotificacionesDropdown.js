import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import { Bell } from "lucide-react";

export default function NotificationsDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const { user, token } = useUser();

  const toggleDropdown = async () => {
    setOpen(!open);
    if (!open && user && token) {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notificaciones/${user.id}`,
          { headers: { Authorization: `${token}` } }
        );
        setNotifications(res.data);
      } catch (error) {
        console.error("Error al obtener notificaciones", error);
      }
    }
  };

  useEffect(() => {
    if (!user || !token) return;

    const fetchNotifications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/notificaciones/${user.id}`,
          { headers: { Authorization: `${token}` } }
        );
        setNotifications(res.data);
      } catch (error) {
        console.error("Error al obtener notificaciones", error);
      }
    };

    fetchNotifications();
  }, [user, token]);

  const markAsRead = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/notificaciones/update/${id}`,
        {},
        { headers: { Authorization: `${token}` } }
      );
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, leida: true } : n))
      );
    } catch (error) {
      console.error("Error al marcar como leída", error);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="relative p-2 bg-gray-200 hover:bg-gray-400 rounded-full"
      >
        <Bell className="h-6 w-6 text-gray-700" />
        {notifications.some((n) => !n.leida) && (
          <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg overflow-y-auto max-h-64 p-3">
          <h3 className="font-bold mb-2 text-black">Notificaciones</h3>

          {notifications.length === 0 ? (
            <p className="text-gray-500">Sin notificaciones</p>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                className={`p-2 mb-2 rounded ${
                  n.leida ? "bg-gray-100" : "bg-blue-100"
                }`}
              >
                <p className="text-black">{n.mensaje}</p>
                <small className="text-gray-500">
                  {n.fecha.replace("T", " ").slice(0, 19)}
                </small>
                {!n.leida && (
                  <button
                    onClick={() => markAsRead(n.id)}
                    className="block mt-1 text-sm text-blue-600 hover:underline"
                  >
                    Marcar como leída
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
