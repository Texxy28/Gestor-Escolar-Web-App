import React from "react";

const CursoDialog = ({ curso }) => {
  return (
    <div>
      {curso.nombre_curso} - {curso.grado} {curso.seccion} ({curso.turno})
    </div>
  );
};

export default CursoDialog;
