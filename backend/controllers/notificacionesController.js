import NotificacionesModel from "../models/notificacionesModel.js";

export const getNotificacionesPorProfesorId = async (req, res) => {
  try {
    const { profesor_id } = req.params;
    const notificaciones = await NotificacionesModel.getNotificacionesPorProfesorId(profesor_id);
    res.json(notificaciones);
  } catch (err) {
    res.status(500).json({ msg: "Error al obtener las notificaciones" })
  }
};

export const marcarComoLeida = async (req, res) => {
    try {
        const { notificacion_id } = req.params;
        await NotificacionesModel.marcarComoLeida(notificacion_id);
        res.json({ msg: "Notificacion actualizada" })
    } catch (err) {
        res.status(500).json({ msg: "Error al actualizar notificacion" })        
    }
}

export const crearNotificacion = async (req, res) => {
    try {
        await NotificacionesModel.crearNotificacion(req.body);
        res.json({ msg: "Notificacion creada" });
    } catch (err) {
        res.status(500).json({ msg: "Error al crear notificacion" })        
    }
}
