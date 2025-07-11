import AsistenciaModel from "../models/asistenciaModel.js";

export const getAsistenciaPorCursoYFecha = async (req, res) => {
  const { curso_id } = req.params;
  const { fecha } = req.query;
  try {
    const asistencias = await AsistenciaModel.getAsistenciasPorCursoYFecha(
      curso_id,
      fecha
    );
    res.json(asistencias);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener las asistencias" });
  }
}

export const getAsistenciaPorCurso = async (req, res) => {
  try {
    const { curso_id } = req.params;
    const asistencias = await AsistenciaModel.getAsistenciasPorCurso(curso_id);
    res.json(asistencias);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener las asistencias" })
  }
}

export const actualizarAsistencia = async (req, res) => {
  try {
    const { alumno_id, curso_id, fecha, presente } = req.body;
    await AsistenciaModel.actualizarAsistencia({
      alumno_id,
      curso_id,
      fecha,
      presente,
    });
    res.json({ msg: "Asistencias actualizadas con exito" });
  } catch (err) {
    res.status(500).json({ msg: "Error al actualizar las asistencias" });
  }
}
