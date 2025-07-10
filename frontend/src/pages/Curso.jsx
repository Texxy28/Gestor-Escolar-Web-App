import { useParams } from "react-router-dom";
import { useUser } from "../context/UserContext";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import LoadingSpinner from "../components/LoadingSpinner";
import AsistenciaFechaPicker from "../components/AsistenciaFechaPicker";

export default function Curso() {
  const { id } = useParams();
  const { token } = useUser();
  const [curso, setCurso] = useState(null);
  const [fechaSeleccionada, setFechaSeleccionada] = useState(null);
  const [notas, setNotas] = useState({});
  const [asistencia, setAsistencia] = useState({});

  const [loading, setLoading] = useState(true);

  const handleFechaSeleccionada = useCallback( async (nuevaFecha) => {
    setFechaSeleccionada(nuevaFecha); 

    try {
        const res = await axios.get(`http://localhost:5000/api/asistencias/cursoyfecha/${id}`, {
          params: { fecha: nuevaFecha.toISOString().split('T')[0] },
          headers: { Authorization: token },
        });

        const asistenciaMap = {};
        res.data.forEach((a) => {
          asistenciaMap[a.alumno_id] = a.presente;
        });
        setAsistencia(asistenciaMap);
      } catch (err) {
        console.error("Error al obtener asistencias", err);
      }

  }, [id, token]);

  const guardarAsistencias = async () => {
    for (const alumno_id in asistencia) {
      const presente = asistencia[alumno_id];

      try {
        await axios.post(
          "http://localhost:5000/api/asistencias/edit",
          {
            alumno_id: parseInt(alumno_id),
            curso_id: id,
            fecha: fechaSeleccionada,
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

    const fetchAll = async () => {
      setLoading(true);

      try {
        const headers = {
          headers: {
            Authorization: `${token}`,
          },
        };

        const fechaHoy = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
        const [resCurso, resNotas, resAsistencias] = await Promise.all([
          axios.get(`http://localhost:5000/api/cursos/curso/${id}`, headers),
          axios.get(`http://localhost:5000/api/notas/${id}`, headers),
          axios.get(
            `http://localhost:5000/api/asistencias/cursoyfecha/${id}?fecha=${fechaHoy}`,
            headers
          ),
        ]);

        const agrupadas = {};
        resNotas.data.forEach(({ alumno_id, trimestre, nota }) => {
          if (!agrupadas[alumno_id]) agrupadas[alumno_id] = {};
          agrupadas[alumno_id][trimestre] = nota;
        });

        const asistenciasMap = {};
        resAsistencias.data.forEach(({ alumno_id, presente }) => {
          asistenciasMap[alumno_id] = presente;
        });

        setCurso(resCurso.data);
        setNotas(agrupadas);
        setAsistencia(asistenciasMap);
      } catch (err) {
        console.err("Error al cargar datos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAll();
  }, [id, token]);

  if (loading) return <LoadingSpinner mensaje="Cargando datos del curso..." />;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-green-800 mb-1">{curso.nombre}</h2>
      <p className="text-gray-700 mb-4">
        <span className="font-medium">Grado:</span> {curso.grado} &nbsp; |
        &nbsp;
        <span className="font-medium">Sección:</span> {curso.seccion} &nbsp; |
        &nbsp;
        <span className="font-medium">Turno:</span> {curso.turno} &nbsp; |
        &nbsp;
        <span className="font-medium">Profesor:</span> {curso.profesor}
      </p>

      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Lista de alumnos</h3>

        <div>
          <AsistenciaFechaPicker
            cursoId={id}
            token={token}
            onFechaSeleccionada={handleFechaSeleccionada}
          />
        </div>
      </div>

      <div className="space-y-6">
        {curso.alumnos.map((alumno) => (
          <div
            key={alumno.id}
            className="border rounded-xl p-4 shadow-sm bg-white"
          >
            <p className="font-semibold text-lg mb-2">
              {alumno.apellidos} {alumno.nombre}
            </p>

            <div className="flex items-center flex-wrap gap-4">
              <div className="flex items-center gap-2">
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
                    className="w-20 border px-2 py-1 rounded text-center"
                  />
                ))}
              </div>

              <button
                onClick={() => guardarNotas(alumno.id)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-blue-700"
              >
                Guardar notas
              </button>

              <div className="flex items-center gap-3">
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
                  {fechaSeleccionada && (
                    <p>
                      Fecha seleccionada: {fechaSeleccionada.toLocaleDateString("es-PE")}
                    </p>
                  )}
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={guardarAsistencias}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Guardar todas las asistencias
      </button>
    </div>
  );
}
