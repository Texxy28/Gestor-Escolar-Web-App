const { sql, config } = require("../database/db");

const AsistenciaModel = {
  async getAsistenciasPorCursoYFecha(curso_id, fecha) {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("curso_id", sql.Int, curso_id)
      .input("fecha", sql.Date, fecha)
      .query(
        `
        SELECT alumno_id, presente
        FROM Asistencias
        WHERE curso_id = @curso_id AND fecha = @fecha
      `
      );
    return result.recordset;
  },

  async getAsistenciasPorCurso(curso_id) {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("curso_id", sql.Int, curso_id)
      .query(`select * from Asistencias where curso_id = @curso_id`);
    return result.recordset;
  },

  async actualizarAsistencia({ alumno_id, curso_id, fecha, presente }) {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("alumno_id", sql.Int, alumno_id)
      .input("curso_id", sql.Int, curso_id)
      .input("fecha", sql.Date, fecha)
      .input("presente", sql.Bit, presente)
      .query(
        `
        MERGE INTO Asistencias AS target
        USING (SELECT @alumno_id AS alumno_id, @curso_id AS curso_id, @fecha AS fecha) AS source
        ON (target.alumno_id = source.alumno_id AND target.curso_id = source.curso_id AND target.fecha = source.fecha)
        WHEN MATCHED THEN 
          UPDATE SET presente = @presente
        WHEN NOT MATCHED THEN 
          INSERT (alumno_id, curso_id, fecha, presente)
          VALUES (@alumno_id, @curso_id, @fecha, @presente);
      `
      );
  },
};

module.exports = AsistenciaModel;
