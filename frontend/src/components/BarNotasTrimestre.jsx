import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts"

const BarNotasTrimestre = ({ dataNotas }) => {
  return (
    <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">
          Promedio de Notas por Trimestre
        </h2>
        <BarChart width={400} height={300} data={dataNotas}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="trimestre" />
          <YAxis domain={[0, 20]} />
          <Tooltip />
          <Bar dataKey="promedio" fill="#8884d8" />
        </BarChart>
      </div>
  )
}

export default BarNotasTrimestre