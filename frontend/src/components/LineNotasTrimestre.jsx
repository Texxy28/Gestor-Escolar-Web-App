import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const LineNotasTrimestre = ({ dataLineas }) => {
  const colores = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#d84d8c"];

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">
        Linea de Evolución de Notas
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dataLineas}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="trimestre" />
          <YAxis domain={[0, 20]} />
          <Tooltip />
          <Legend />
          {dataLineas.length > 0 &&
            Object.keys(dataLineas[0])
              .filter((key) => key !== "trimestre")
              .map((nombre, idx) => (
                <Line
                  key={nombre}
                  type="monotone"
                  dataKey={nombre}
                  stroke={colores[idx % colores.length]}
                  strokeWidth={2}
                  dot={{ r: 3 }}
                  activeDot={{ r: 5 }}
                />
              ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineNotasTrimestre;
