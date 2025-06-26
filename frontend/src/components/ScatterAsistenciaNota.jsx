import { CartesianGrid, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis } from "recharts";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length > 0) {
    const alumno = payload[0].payload; // accede al punto original
    return (
      <div className="bg-white border p-2 rounded shadow text-sm">
        <p>
          <strong>Alumno:</strong> {alumno.nombre}
        </p>
        <p>
          <strong>Asistencia:</strong> {alumno.x}%
        </p>
        <p>
          <strong>Nota:</strong> {alumno.y}
        </p>
      </div>
    );
  }

  return null;
};

export const ScatterAsistenciaNota = ({ dataScatter, tendencia }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">
        Relación entre Asistencia (%) y Promedio de Nota
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
          <CartesianGrid />
          <XAxis
            type="number"
            dataKey="x"
            name="Asistencia (%)"
            domain={[0, 100]}
            unit="%"
          />
          <YAxis type="number" dataKey="y" name="Promedio" domain={[0, 20]} />
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Legend />
          <Scatter
            name="Alumnos"
            data={dataScatter}
            fill="#8884d8"
            label={(props) => {
              const { x, y, index } = props;
              const alumno = dataScatter[index];
              if (!alumno) return null;

              return (
                <text x={x + 5} y={y - 5} fontSize={12} fill="#333">
                  {alumno.nombre}
                </text>
              );
            }}
          />
          <Scatter
            name="Tendencia"
            data={tendencia}
            line={{ stroke: "#ff7300", strokeWidth: 2 }}
            shape="none"
          />
        </ScatterChart>
      </ResponsiveContainer>
    </div>
  );
};
