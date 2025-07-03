import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { getUserByEmail } from '../models/userModel.js';

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await getUserByEmail(email);
  if (!user) return res.status(401).json({ msg: 'Credenciales inválidas' });

  const isMatch = await bcrypt.compare(password, user.password.trim());
  if (!isMatch) return res.status(401).json({ msg: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token, user });
};
