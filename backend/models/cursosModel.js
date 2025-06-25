const { sql, config } = require("../database/db");

const CursosModel = {
  async obtenerCursosPorProfesorUsuario(usuario_id) {
    const pool = await sql.connect(config);
    const result = await pool.request().input("usuario_id", sql.Int, usuario_id)
      .query(`SELECT 
        C.id AS curso_id,
        C.nombre AS nombre_curso,
        GS.grado,
        GS.seccion,
        GS.nivel,
        GS.turno
        FROM Cursos C
        JOIN Profesores P ON C.profesor_id = P.id
        JOIN Usuarios U ON P.usuario_id = U.id
        JOIN GradosSecciones GS ON C.grado_seccion_id = GS.id
        WHERE U.id = @usuario_id
        ORDER BY GS.grado, GS.seccion
        `);
    return result.recordset;
  },
};

module.exports = CursosModel;
