// backend/controllers/notas.controller.js
const NotasModel = require('../models/notasModel');

exports.crearNota = async (req, res) => {
  try {
    await NotasModel.crearNota(req.body);
    res.json({ msg: 'Nota registrada correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error al registrar nota' });
  }
};

exports.obtenerNotas = async (req, res) => {
  try {
    const notas = await NotasModel.obtenerNotasPorCurso(req.params.curso_id);
    res.json(notas);
  } catch (err) {
    res.status(500).json({ msg: 'Error al obtener notas' });
  }
};

exports.actualizarNota = async (req, res) => {
  try {
    const { nota } = req.body;
    await NotasModel.actualizarNota(req.params.id, nota);
    res.json({ msg: 'Nota actualizada correctamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al actualizar nota' });
  }
};

exports.eliminarNota = async (req, res) => {
  try {
    await NotasModel.eliminarNota(req.params.id);
    res.json({ msg: 'Nota eliminada correctamente' });
  } catch (err) {
    res.status(500).json({ msg: 'Error al eliminar nota' });
  }
};
