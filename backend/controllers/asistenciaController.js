const AsistenciaModel = require("../models/asistenciaModel");

exports.getAsistenciaPorCurso = async (req, res) => {
  const { curso_id } = req.params;
  const { fecha } = req.query;
  try {
    const asistencias = await AsistenciaModel.getAsistenciasPorCurso(
      curso_id,
      fecha
    );
    res.json(asistencias);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener las asistencias" });
  }
};

exports.actualizarAsistencia = async (req, res) => {
  try {
    const { alumno_id, curso_id, fecha, presente } = req.body;
    await AsistenciaModel.actualizarAsistencia({
      alumno_id,
      curso_id,
      fecha,
      presente,
    });
    res.json({ msg: "Asistencias actualizadas con exito" })
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar las asistencias" })
  }
};
