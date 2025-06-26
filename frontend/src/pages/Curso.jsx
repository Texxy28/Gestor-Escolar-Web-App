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

  const guardarAsistencias = async () => {
    const fechaHoy = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

    for (const alumno_id in asistencia) {
      const presente = asistencia[alumno_id];

      try {
        await axios.post(
          "http://localhost:5000/api/asistencias/",
          {
            alumno_id: parseInt(alumno_id),
            curso_id: id,
            fecha: fechaHoy,
            presente,
          },
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );
      } catch (err) {
        console.error(
          `Error al guardar asistencia para alumno ${alumno_id}`,
          err
        );
      }
    }
  };

  const guardarNotas = async (alumnoId) => {
    const notasAlumno = notas[alumnoId];
    if (!notasAlumno) return;

    for (const trimestre of [1, 2, 3]) {
      const nota = notasAlumno[trimestre];
      if (nota !== undefined && nota !== "") {
        try {
          await axios.post(
            "http://localhost:5000/api/notas/edit",
            {
              alumno_id: alumnoId,
              curso_id: curso.curso_id,
              trimestre,
              nota,
            },
            {
              headers: {
                Authorization: `${token}`,
              },
            }
          );
        } catch (err) {
          console.error(`Error guardando nota del alumno ${alumnoId}:`, err);
        }
      }
    }
  };

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
      const res = await axios.get(`http://localhost:5000/api/notas/${id}`, {
        headers: {
          Authorization: `${token}`,
        },
      });
      const agrupadas = {};
      res.data.forEach(({ alumno_id, trimestre, nota }) => {
        if (!agrupadas[alumno_id]) agrupadas[alumno_id] = {};
        agrupadas[alumno_id][trimestre] = nota;
      });

      setNotas(agrupadas);
    };

    const fetchAsistencias = async () => {
      try {
        const fechaHoy = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        const res = await axios.get(
          `http://localhost:5000/api/asistencias/curso/${id}?fecha=${fechaHoy}`,
          {
            headers: {
              Authorization: `${token}`,
            },
          }
        );

        const asistenciasMap = {};
        res.data.forEach(({ alumno_id, presente }) => {
          asistenciasMap[alumno_id] = presente;
        });

        setAsistencia(asistenciasMap);
      } catch (err) {
        console.error("Error al cargar asistencias:", err);
      }
    };

    fetchCurso();
    fetchNotas();
    fetchAsistencias();
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

          <div className="flex items-center space-x-2 mt-2">
            {[1, 2, 3].map((trimestre) => (
              <input
                key={trimestre}
                type="number"
                min={0}
                max={20}
                placeholder={`T${trimestre}`}
                value={notas[alumno.id]?.[trimestre] || ""}
                onChange={(e) => {
                  const nuevaNota = parseFloat(e.target.value) || "";
                  setNotas((prev) => ({
                    ...prev,
                    [alumno.id]: {
                      ...prev[alumno.id],
                      [trimestre]: nuevaNota,
                    },
                  }));
                }}
                className="w-16 border px-2 py-1 rounded"
              />
            ))}
            <button
              onClick={() => guardarNotas(alumno.id)}
              className="ml-4 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
            >
              Guardar
            </button>
          </div>

          <span
            className={`px-2 py-1 rounded text-sm ${
              asistencia[alumno.id] === true
                ? "bg-green-100 text-green-700"
                : asistencia[alumno.id] === false
                ? "bg-red-100 text-red-700"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {asistencia[alumno.id] === true
              ? "Presente"
              : asistencia[alumno.id] === false
              ? "Ausente"
              : "Sin registro"}
          </span>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={asistencia[alumno.id] || false}
              onChange={(e) => {
                const value = e.target.checked;
                setAsistencia((prev) => ({
                  ...prev,
                  [alumno.id]: value,
                }));
              }}
            />
            Presente
          </label>
        </div>
      ))}

      <button
        onClick={guardarAsistencias}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guardar asistencias
      </button>
    </div>
  );
}
