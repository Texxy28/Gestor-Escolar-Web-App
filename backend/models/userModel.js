const { sql, config } = require('../database/db');

async function getUserByEmail(email) {
  const pool = await sql.connect(config);
  const result = await pool.request()
    .input('email', sql.VarChar, email)
    .query('SELECT * FROM Usuarios WHERE email = @email');
  return result.recordset[0];
}

module.exports = { getUserByEmail };
