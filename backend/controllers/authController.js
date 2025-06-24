const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUserByEmail } = require('../models/userModel');

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) return res.status(401).json({ msg: 'Credenciales inválidas' });

  const isMatch = await bcrypt.compare(password, user.password.trim());
  if (!isMatch) return res.status(401).json({ msg: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
};
