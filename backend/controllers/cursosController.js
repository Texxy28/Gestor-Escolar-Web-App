import CursosModel from "../models/cursosModel.js";

export const obtenerCursoPorProfesorUsuario = async (req, res) => {
    try {
        const cursos = await CursosModel.obtenerCursosPorProfesorUsuario(req.params.usuario_id);
        res.json(cursos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener cursos' });
    }
}

export const obtenerCursoPorId = async (req, res) => {
    try {
        const curso = await CursosModel.obtenerCursoPorId(req.params.curso_id);
        res.json(curso);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener curso' });
    }
}

export const obtenerHorariosPorCurso = async (req, res) => {
    try {
        const horarios = await CursosModel.obtenerHorariosPorCurso(req.params.curso_id);
        res.json(horarios)
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener horarios' });
    }
}