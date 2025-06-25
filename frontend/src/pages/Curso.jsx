import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Curso() {
  const { id } = useParams(); // ID del curso
  const { token } = useUser();
  const [curso, setCurso] = useState(null);

  useEffect(() => {

    if (!token) return;

    const fetchCurso = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/cursos/curso/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setCurso(res.data);
    };

    fetchCurso();
  }, [id, token]);

  if (!curso) return <div>Cargando detalles del curso...</div>;

  console.log(curso)

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{curso.nombre}</h2>
      <p className="mt-2">Grado: {curso.grado}</p>
      <p>Sección: {curso.seccion}</p>
      <p>Turno: {curso.turno}</p>
      <p>Profesor: {curso.profesor}</p>
      {/* Puedes agregar alumnos, notas, etc. */}
    </div>
  );

}
