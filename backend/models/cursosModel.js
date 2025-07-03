import { sql, config } from "../database/db.js";

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

  async obtenerCursoPorId(curso_id) {
    const pool = await sql.connect(config);
    const result = await pool.request().input("curso_id", sql.Int, curso_id)
      .query(`
        SELECT 
          C.id AS curso_id,
          C.nombre AS nombre,
          GS.id AS grado_seccion_id,
          GS.grado,
          GS.seccion,
          GS.nivel,
          GS.turno,
          U.nombre AS profesor
        FROM Cursos C
        JOIN Profesores P ON C.profesor_id = P.id
        JOIN Usuarios U ON P.usuario_id = U.id
        JOIN GradosSecciones GS ON C.grado_seccion_id = GS.id
        WHERE C.id = @curso_id
        `);
    const curso = result.recordset[0];

     // 2. Obtener alumnos del mismo grado_seccion
    const alumnosResult = await pool
      .request()
      .input("gradoSeccionId", sql.Int, curso.grado_seccion_id)
      .query(`
        SELECT id, nombre, apellidos
        FROM Alumnos
        WHERE grado_seccion_id = @gradoSeccionId
        ORDER BY apellidos, nombre
      `);

    curso.alumnos = alumnosResult.recordset;

    return curso;
  },
};

export default CursosModel;
