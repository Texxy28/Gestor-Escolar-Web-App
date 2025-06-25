import { useNavigate } from "react-router-dom";

const CursoDialog = ({ curso }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/curso/${curso.curso_id}`);
  };

  return (
    <div
      className="bg-gray-500 p-5 m-4 hover:bg-gray-300 cursor-pointer"
      onClick={handleClick}
    >
      {curso.nombre_curso} - {curso.grado} {curso.seccion} ({curso.turno})
    </div>
  );
};

export default CursoDialog;
