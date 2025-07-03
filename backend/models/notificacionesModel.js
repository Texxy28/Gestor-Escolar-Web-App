import { sql, config } from "../database/db.js";

const NotificacionesModel = {
  async getNotificacionesPorProfesorId(profesor_id) {
    const pool = await sql.connect(config);
    const result = await pool
      .request()
      .input("profesor_id", sql.Int, profesor_id)
      .query(
        `SELECT * FROM Notificaciones WHERE profesor_id = @profesor_id ORDER BY fecha DESC`
      );
    return result.recordset;
  },

  async marcarComoLeida(notificacion_id) {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("id", sql.Int, notificacion_id)
      .query("UPDATE Notificaciones SET leida = 1 WHERE id = @id");
  },

  async crearNotificacion({ profesor_id, mensaje }) {
    const pool = await sql.connect(config);
    await pool
      .request()
      .input("profesor_id", sql.Int, profesor_id)
      .input("mensaje", sql.NVarChar, mensaje).query(`
      INSERT INTO Notificaciones (profesor_id, mensaje)
      VALUES (@profesor_id, @mensaje)
    `);
  },
};

export default NotificacionesModel;
