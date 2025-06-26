import { useEffect, useState } from "react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import BarNotasTrimestre from "./BarNotasTrimestre";
import BarNotasAlumnoTrimestre from "./BarNotasAlumnoTrimestre";
import PieAsistencia from "./PieAsistencia";
import { ScatterAsistenciaNota } from "./ScatterAsistenciaNota";
import LineNotasTrimestre from "./LineNotasTrimestre";

const ResumenEstadisticas = ({ curso_id }) => {
  const { token } = useUser();

  const [notas, setNotas] = useState({});
  const [alumnos, setAlumnos] = useState([]);
  const [asistencias, setAsistencias] = useState([]);

  const [dataNotas, setDataNotas] = useState([]);
  const [dataAgrupada, setDataAgrupada] = useState([]);
  const [dataAsistencia, setDataAsistencia] = useState([]);
  const [dataScatter, setDataScatter] = useState([]);
  const [tendencia, setTendencia] = useState([]);
  const [dataLineas, setDataLineas] = useState([]);
  const [alumnoSeleccionado, setAlumnoSeleccionado] = useState(null);

  const agruparAsistencias = (asistenciasPlanas) => {
    const agrupadas = {};

    asistenciasPlanas.forEach((a) => {
      if (!agrupadas[a.alumno_id]) agrupadas[a.alumno_id] = [];
      agrupadas[a.alumno_id].push(a);
    });

    return agrupadas;
  };

  useEffect(() => {
    if (!token) return;

    const fetchNotas = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/notas/${curso_id}`,
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

    const fetchAsistencias = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/asistencias/curso/${curso_id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setAsistencias(res.data);
    };

    const fetchCursoYAlumnos = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/cursos/curso/${curso_id}`,
        {
          headers: {
            Authorization: `${token}`,
          },
        }
      );
      setAlumnos(res.data.alumnos);
    };

    fetchNotas();
    fetchAsistencias();
    fetchCursoYAlumnos();
  }, [token, curso_id]);

  useEffect(() => {
    const trimestres = [1, 2, 3];

    const procesado = trimestres.map((t) => {
      const notasT = Object.values(notas)
        .map((trims) => trims[t])
        .filter((n) => n != null);

      const promedio =
        notasT.reduce((acc, val) => acc + val, 0) / (notasT.length || 1);

      return {
        trimestre: `T${t}`,
        promedio: parseFloat(promedio.toFixed(2)),
      };
    });

    setDataNotas(procesado);
  }, [notas]);

  useEffect(() => {
    if (!alumnos || Object.keys(notas).length === 0) return;

    const filtrados = alumnos
      .filter((a) => !alumnoSeleccionado || a.id === alumnoSeleccionado)
      .map((alumno) => {
        const trims = notas[alumno.id] || {};
        return {
          nombre: `${alumno.nombre} ${alumno.apellidos}`,
          T1: trims[1] ?? 0,
          T2: trims[2] ?? 0,
          T3: trims[3] ?? 0,
        };
      });

    setDataAgrupada(filtrados);
  }, [alumnos, notas, alumnoSeleccionado]);

  useEffect(() => {
    if (!asistencias || asistencias.length === 0) {
      setDataAsistencia([]);
      return;
    }

    let registrosFiltrados = asistencias;

    if (alumnoSeleccionado) {
      registrosFiltrados = asistencias.filter(
        (a) => a.alumno_id === alumnoSeleccionado
      );
    }

    const presentes = registrosFiltrados.filter((a) => a.presente).length;
    const ausentes = registrosFiltrados.length - presentes;

    setDataAsistencia([
      { name: "Asistencias", value: presentes },
      { name: "Faltas", value: ausentes },
    ]);
  }, [asistencias, alumnoSeleccionado]);

  useEffect(() => {
    if (!alumnos || !notas || !asistencias) return;
    const asistenciasAgrupadas = agruparAsistencias(asistencias);

    const alumnosFiltrados = alumnoSeleccionado
      ? alumnos.filter((a) => a.id === parseInt(alumnoSeleccionado))
      : alumnos;

    const datos = alumnosFiltrados.map((a) => {
      const asis = asistenciasAgrupadas[a.id] || [];
      const total = asis.length;
      const presentes = asis.filter((x) => x.presente).length;
      const porcentaje = total > 0 ? (presentes / total) * 100 : 0;

      const notasAlumno = notas[a.id] || {};
      const promedioNotas = Object.values(notasAlumno).length
        ? Object.values(notasAlumno).reduce((a, b) => a + b, 0) /
          Object.values(notasAlumno).length
        : 0;

      return {
        x: Math.round(porcentaje),
        y: parseFloat(promedioNotas.toFixed(2)),
        nombre: `${a.nombre} ${a.apellidos}`,
      };
    });

    setDataScatter(datos);

    if (datos.length >= 2) {
      const sorted = [...datos].sort((a, b) => a.x - b.x);
      setTendencia([sorted[0], sorted[sorted.length - 1]]);
    } else {
      setTendencia([]);
    }
  }, [alumnos, notas, asistencias, alumnoSeleccionado]);

  useEffect(() => {
    if (!notas || !alumnos) return;

    const trimestres = [1, 2, 3];

    const alumnosFiltrados = alumnoSeleccionado
      ? alumnos.filter((a) => a.id === parseInt(alumnoSeleccionado))
      : alumnos;

    const datos = trimestres.map((trim) => {
      const entry = { trimestre: `T${trim}` };

      alumnosFiltrados.forEach((a) => {
        const notasAlumno = notas[a.id] || {};
        const nombreCompleto = `${a.nombre} ${a.apellidos}`;
        entry[nombreCompleto] = notasAlumno[trim] ?? null;
      });

      return entry;
    });

    setDataLineas(datos);
  }, [notas, alumnos, alumnoSeleccionado]);

  return (
    <div className="p-6 max-w-max mx-auto space-y-6 ">
      <div className="mb-6">
        <label className="block mb-2 font-semibold text-lg">
          Filtrar por alumno:
        </label>
        <select
          onChange={(e) => {
            const id = parseInt(e.target.value);
            setAlumnoSeleccionado(id === -1 ? null : id);
          }}
          className="w-full border border-gray-300 rounded px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value={-1}>-- Ver todos --</option>
          {alumnos.map((alumno) => (
            <option key={alumno.id} value={alumno.id}>
              {alumno.nombre} {alumno.apellidos}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <BarNotasTrimestre dataNotas={dataNotas} />
        <BarNotasAlumnoTrimestre dataAgrupada={dataAgrupada} />
        <PieAsistencia
          alumnos={alumnos}
          alumnoSeleccionado={alumnoSeleccionado}
          dataAsistencia={dataAsistencia}
        />
        <ScatterAsistenciaNota
          dataScatter={dataScatter}
          tendencia={tendencia}
          alumnoSeleccionado={alumnoSeleccionado}
        />
        <LineNotasTrimestre
          dataLineas={dataLineas}
          alumnoSeleccionado={alumnoSeleccionado}
        />
      </div>
    </div>
  );
};

export default ResumenEstadisticas;
