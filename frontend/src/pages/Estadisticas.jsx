import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import ResumenEstadisticas from "../components/ResumenEstadisticas";

export default function Estadisticas() {
  const [cursos, setCursos] = useState([]);
  const [option, setOption] = useState(null);

  const { user, token } = useUser();

  const handleChange = (e) => {
    setOption(e.target.value || null);
  };

  useEffect(() => {
    if (!user || !token) return;

    const fetchCursos = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/cursos/${user.id}`,
          { headers: { Authorization: `${token}` } }
        );

        setCursos(res.data);
      } catch (error) {
        console.error("Error al obtener cursos", error);
      }
    };

    fetchCursos();
  }, [user, token]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Resumen de Estadísticas
      </h2>

      <select
        onChange={handleChange}
        className="w-full border px-4 py-2 rounded mb-6"
        defaultValue=""
      >
        <option value="" disabled>
          -- Seleccione un curso --
        </option>
        {cursos.map((curso) => (
          <option key={curso.curso_id} value={curso.curso_id}>
            {curso.nombre_curso}
          </option>
        ))}
      </select>

      {option && <ResumenEstadisticas curso_id={parseInt(option)} />}
    </div>
  );
}
