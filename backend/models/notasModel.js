import { sql, config } from "../database/db.js";
import NotificacionesModel from "./notificacionesModel.js";

const NotasModel = {
  async crearNota({ alumno_id, curso_id, trimestre, nota }) {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("alumno_id", sql.Int, alumno_id)
      .input("curso_id", sql.Int, curso_id)
      .input("trimestre", sql.Int, trimestre)
      .input("nota", sql.Decimal(5, 2), nota).query(`
        INSERT INTO Notas (alumno_id, curso_id, trimestre, nota)
        VALUES (@alumno_id, @curso_id, @trimestre, @nota)
      `);
  },

  async obtenerNotasPorCurso(curso_id) {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("curso_id", sql.Int, curso_id)
      .query(
        `SELECT alumno_id, trimestre, nota FROM Notas WHERE curso_id = @curso_id`
      );
    return result.recordset;
  },

  async actualizarNota({ alumno_id, curso_id, trimestre, nota }) {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("alumno_id", sql.Int, alumno_id)
      .input("curso_id", sql.Int, curso_id)
      .input("trimestre", sql.Int, trimestre)
      .input("nota", sql.Decimal(5, 2), nota).query(`
        MERGE INTO Notas AS target
        USING (SELECT @alumno_id AS alumno_id, @curso_id AS curso_id, @trimestre AS trimestre) AS source
        ON (target.alumno_id = source.alumno_id AND target.curso_id = source.curso_id AND target.trimestre = source.trimestre)
        WHEN MATCHED THEN
          UPDATE SET nota = @nota
        WHEN NOT MATCHED THEN
          INSERT (alumno_id, curso_id, trimestre, nota)
          VALUES (@alumno_id, @curso_id, @trimestre, @nota);
      `);

    if (nota < 10) {
      const result = await pool.request().input("curso_id", sql.Int, curso_id)
        .query(`
          SELECT profesor_id FROM Cursos WHERE id = @curso_id
        `);

      const profesor_id = result.recordset[0]?.profesor_id;

      if (profesor_id) {
        const result = await pool.request().input("curso_id", sql.Int, curso_id)
          .query(`
              SELECT nombre from Cursos where id = @curso_id
            `);

        const curso = result.recordset[0]?.nombre;

        const resultAlumno = await pool
          .request()
          .input("alumno_id", sql.Int, alumno_id)
          .query(`SELECT nombre, apellidos from Alumnos where id = @alumno_id`);

        const alumno = `${resultAlumno.recordset[0].apellidos}, ${resultAlumno.recordset[0]?.nombre}`;

        await NotificacionesModel.crearNotificacion({
          profesor_id,
          mensaje: `Nota baja detectada en el curso ${curso} del alumno ${alumno}`,
        });
      }
    }
  },

  async eliminarNota(id) {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("id", sql.Int, id)
      .query(`DELETE FROM Notas WHERE id = @id`);
  },

  async obtenerNotaPorAlumnoYCurso(alumno_id, curso_id) {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("alumno_id", sql.Int, alumno_id)
      .input("curso_id", sql.Int, curso_id)
      .query(
        `SELECT trimestre, nota
        FROM Notas
        WHERE alumno_id = @alumno_id AND curso_id = @curso_id
        ORDER BY trimestre`
      );
    return result.recordset;
  },
};

export default NotasModel;
