import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";

export default function Estadisticas() {
  const [cursos, setCursos] = useState([]);

  const { user, token } = useUser();

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
    <div>
      <select>
        <option selected>--Seleccione un curso--</option>
        {cursos.map((curso) => (
            <option key={curso.curso_id}>{curso.nombre_curso}</option>
        ))}
      </select>
    </div>
  );
}
