import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import CursoDialog from "../components/CursoDialog";
import LoadingSpinner from "../components/LoadingSpinner";

export default function Dashboard() {
  const [cursos, setCursos] = useState([]);

  const { user, token } = useUser();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !token) return;

    const fetchCursos = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cursos/${user.id}`,
          { headers: { Authorization: `${token}` } }
        );

        setCursos(res.data);
      } catch (error) {
        console.error("Error al obtener cursos", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCursos();
  }, [user, token]);

  if (loading) return <LoadingSpinner mensaje="Cargando detalles..." />;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Bienvenido,{" "}
        <span className="text-blue-600">{user?.nombre || "Invitado"}</span>
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {cursos.map((curso) => (
          <CursoDialog key={curso.curso_id} curso={curso} />
        ))}
      </div>
    </div>
  );
}
