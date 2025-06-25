const CursosModel = require("../models/cursosModel");

exports.obtenerCursoPorProfesorUsuario = async (req, res) => {
    try {
        const cursos = await CursosModel.obtenerCursosPorProfesorUsuario(req.params.usuario_id);
        res.json(cursos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener cursos' });
    }
}

exports.obtenerCursoPorId = async(req, res) => {
    try {
        const curso = await CursosModel.obtenerCursoPorId(req.params.curso_id);
        res.json(curso);
    } catch (err) {
        console.error(err);
        res.status(500).json({ msg: 'Error al obtener curso' });
    }
}