import { useNavigate } from "react-router-dom";

const CursoDialog = ({ curso }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/curso/${curso.curso_id}`);
  };

  return (
    <div
      className="bg-white rounded-2xl shadow-md p-6 cursor-pointer transition-all hover:shadow-lg hover:scale-[1.02] border border-gray-200"
      onClick={handleClick}
    >
      <h3 className="text-xl font-semibold text-blue-700 mb-1">
        {curso.nombre}
      </h3>
      <p className="text-gray-600 text-sm">
        Grado: <span className="font-medium">{curso.grado}</span> &nbsp;
        Sección: <span className="font-medium">{curso.seccion}</span> &nbsp;
        Turno: <span className="font-medium">{curso.turno}</span>
      </p>
    </div>
  );
};

export default CursoDialog;
