import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const BarNotasAlumnoTrimestre = ({ dataAgrupada }) => {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-2">Notas por Alumno y Trimestre</h2>
      <BarChart width={600} height={400} data={dataAgrupada}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="nombre" angle={-45} textAnchor="end" height={100} />
        <YAxis domain={[0, 20]} />
        <Tooltip />
        <Bar dataKey="T1" fill="#8884d8" name="Trimestre 1" />
        <Bar dataKey="T2" fill="#82ca9d" name="Trimestre 2" />
        <Bar dataKey="T3" fill="#ffc658" name="Trimestre 3" />
      </BarChart>
    </div>
  );
};

export default BarNotasAlumnoTrimestre;
