import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Curso() {
  const { id } = useParams(); // ID del curso
  const { token } = useUser();
  const [curso, setCurso] = useState(null);
  const [notas, setNotas] = useState({}); // { alumnoId: { 1: 12, 2: 14, 3: 16 } }
  const [asistencia, setAsistencia] = useState({}); // { alumnoId: true/false }
  const [fecha, setFecha] = useState(
    () => new Date().toISOString().split("T")[0]
  ); // yyyy-mm-dd

  const guardarNotas = (alumnoid) => {};

  const handleChangeNota = (alumnoId, trimestre, nota) => {};

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

     const fetchNotas = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/notas/${id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      const agrupadas = {};
      res.data.forEach(({ alumno_id, trimestre, nota }) => {
        if (!agrupadas[alumno_id]) agrupadas[alumno_id] = {};
        agrupadas[alumno_id][trimestre] = nota;
      });

      setNotas(agrupadas);
    };

    fetchCurso();
    fetchNotas();
  }, [id, token]);

  if (!curso) return <div>Cargando detalles del curso...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">{curso.nombre}</h2>
      <p className="mt-2">Grado: {curso.grado}</p>
      <p>Sección: {curso.seccion}</p>
      <p>Turno: {curso.turno}</p>
      <p>Profesor: {curso.profesor}</p>

      <h1>Lista de alumnos</h1>

      {curso.alumnos.map((alumno) => (
        <div key={alumno.id}>
          <p>
            {alumno.apellidos} {alumno.nombre}
          </p>

          {/* Notas */}
          <div className="flex items-center space-x-2 mt-2">
            {[1, 2, 3].map((trimestre) => (
              <input
                key={trimestre}
                type="number"
                min={0}
                max={20}
                placeholder={`T${trimestre}`}
                value={notas[alumno.id]?.[trimestre] || ""}
                onChange={(e) =>
                  handleChangeNota(alumno.id, trimestre, e.target.value)
                }
                className="w-16 border px-2 py-1 rounded"
              />
            ))}
            <button
              onClick={() => guardarNotas(alumno.id)}
              className="px-3 py-1 bg-blue-600 text-white rounded"
            >
              Guardar notas
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
