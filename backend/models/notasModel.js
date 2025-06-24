// backend/models/notas.model.js
const { sql, config } = require('../database/db');

const NotasModel = {
  async crearNota({ alumno_id, curso_id, trimestre, nota }) {
    const pool = await sql.connect(config);
    await pool.request()
      .input('alumno_id', sql.Int, alumno_id)
      .input('curso_id', sql.Int, curso_id)
      .input('trimestre', sql.Int, trimestre)
      .input('nota', sql.Decimal(5, 2), nota)
      .query(`
        INSERT INTO Notas (alumno_id, curso_id, trimestre, nota)
        VALUES (@alumno_id, @curso_id, @trimestre, @nota)
      `);
  },

  async obtenerNotasPorCurso(curso_id) {
    const pool = await sql.connect(config);
    const result = await pool.request()
      .input('curso_id', sql.Int, curso_id)
      .query(`SELECT * FROM Notas WHERE curso_id = @curso_id`);
    return result.recordset;
  },

  async actualizarNota(id, nota) {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .input('nota', sql.Decimal(5, 2), nota)
      .query(`UPDATE Notas SET nota = @nota WHERE id = @id`);
  },

  async eliminarNota(id) {
    const pool = await sql.connect(config);
    await pool.request()
      .input('id', sql.Int, id)
      .query(`DELETE FROM Notas WHERE id = @id`);
  }
};

module.exports = NotasModel;
