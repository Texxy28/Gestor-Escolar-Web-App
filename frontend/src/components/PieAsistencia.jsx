import { Cell, Legend, Pie, PieChart, Tooltip } from "recharts";

const PieAsistencia = ({ dataAsistencia, alumnos, alumnoSeleccionado }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">
        Asistencia
        {alumnoSeleccionado
          ? ` de ${alumnos.find((a) => a.id === alumnoSeleccionado)?.nombre}`
          : " del curso"}
      </h2>

      <PieChart width={400} height={300}>
        <Pie
          data={dataAsistencia}
          cx="50%"
          cy="50%"
          label
          outerRadius={100}
          dataKey="value"
        >
          <Cell fill="#82ca9d" /> {/* Asistencias */}
          <Cell fill="#ff6961" /> {/* Faltas */}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieAsistencia;
