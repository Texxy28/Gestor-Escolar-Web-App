import NotasModel from "../models/notasModel.js";

export const crearNota = async (req, res) => {
  try {
    await NotasModel.crearNota(req.body);
    res.json({ msg: "Nota registrada correctamente" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error al registrar nota" });
  }
};

export const obtenerNotas = async (req, res) => {
  try {
    const notas = await NotasModel.obtenerNotasPorCurso(req.params.curso_id);
    res.json(notas);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener notas" });
  }
};

export const actualizarNota = async (req, res) => {
  try {
    const { alumno_id, curso_id, trimestre, nota } = req.body;
    await NotasModel.actualizarNota({ alumno_id, curso_id, trimestre, nota });
    res.json({ msg: "Nota actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar nota" });
  }
};

export const eliminarNota = async (req, res) => {
  try {
    await NotasModel.eliminarNota(req.params.id);
    res.json({ msg: "Nota eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ msg: "Error al eliminar nota" });
  }
};

export const obtenerNotaPorAlumnoYCurso = async (req, res) => {
  const { alumno_id, curso_id } = req.params;
  try {
    const notas = await NotasModel.obtenerNotaPorAlumnoYCurso(
      alumno_id,
      curso_id
    );
    res.json(notas);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener notas" });
  }
};
