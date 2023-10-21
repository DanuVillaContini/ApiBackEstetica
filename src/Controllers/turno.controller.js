const Turnos = require("../Models/turno.model");

const createTurno = async (req, res) => {
    try {
        const {
            dia_disponible,
            mes_disponible,
            hora_disponible,
            minute_disponible,
        } = req.body;
        const turno = new Turnos({
            dia_disponible,
            mes_disponible,
            hora_disponible,
            minute_disponible,
        })
        await turno.save();
        res.status(201)
        res.json({ message: "Nuevo Turno disponible registrado con exito" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "No se ha podido registrar el turno" })
    }
}
const mostrarTurnos = async (req, res) => {
    try {
        const turnos = await Turnos.find();
        res.status(200).json(turnos);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al recuperar los turnos', error: error.message });
    }
}

const mostrarTurnoPorId = async (req, res) => {
    try {
        const turno = await Turnos.findById(req.params.id);
        if (turno === null) {
            res.status(404);
            return res.json({ message: "Turno no encontrado" });
        }

        res.status(200).json(turno);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};

module.exports = { mostrarTurnoPorId };

const actualizarTurno = async (req, res) => {
    try {
        const turno = await Turnos.findById(req.params.id);
        if (turno === null) {
            res.status(404);
            return res.json({ message: "Turno no encontrado" });
        }

        if (req.body.hasOwnProperty('disponible')) {
            turno.disponible = req.body.disponible;
        }

        turno.dia_disponible = req.body.dia_disponible;
        turno.mes_disponible = req.body.mes_disponible;
        turno.hora_disponible = req.body.hora_disponible;
        turno.minute_disponible = req.body.minute_disponible;

        await turno.save();

        res.json({ message: "Turno actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};

const eliminarTurno = async (req, res) => {
    try {
        const turno = await Turnos.findById(req.params.id);
        if (turno === null) {
            res.status(404);
            return res.json({ message: "Turno no encontrado" });
        }
        const filters = { _id: req.params.id };
        const deletedDocuments = await Turnos.deleteOne(filters);
        res.json({ message: "Turno eliminado" })

    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el turno', error: error.message });
    }
};





module.exports = {createTurno, mostrarTurnos, actualizarTurno, eliminarTurno, mostrarTurnoPorId};