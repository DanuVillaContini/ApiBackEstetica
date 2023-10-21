const Reserva = require('../Models/reservas.model');
const Turnos = require('../Models/turno.model');
const Usuario = require('../Models/usuario.model')

const crearReserva = async (req, res) => {
    try {
        const { turnoId, clienteId, otrosDetalles } = req.body;

        // Verificar si el turno está disponible
        const turno = await Turnos.findById(turnoId);
        if (!turno || !turno.disponible) {
            return res.status(400).json({ message: 'El turno no está disponible' });
        }

        const cliente = await Usuario.findById(clienteId);
        if (!cliente) { // Corrección: Verificar si el cliente no existe
            return res.status(400).json({ message: 'Usuario que se registra, no encontrado' });
        }

        // Crear la reserva con el cliente
        const reserva = new Reserva({
            turno: turnoId,
            cliente: clienteId,
            otrosDetalles: otrosDetalles
        });
        await reserva.save();

        // Actualizar la disponibilidad del turno a false
        turno.disponible = false;
        await turno.save();

        res.status(201).json({ message: 'Reserva creada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear la reserva' });
    }
};

const mostrarReservas = async (req, res) => {
    try {
        const reservas = await Reserva.find().populate('turno');

        res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener las reservas' });
    }
};



const cancelarReserva = async (req, res) => {
    try {
        const reservaId = req.params.id;

        const reserva = await Reserva.findById(reservaId);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        const turno = await Turnos.findById(reserva.turno);
        if (turno) {
            turno.disponible = true; 
            await turno.save();
        }

        await Reserva.findByIdAndRemove(reservaId);

        res.json({ message: 'Reserva cancelada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cancelar la reserva' });
    }
};



module.exports = {
    crearReserva,
    mostrarReservas,
    // actualizarReserva,
    cancelarReserva,
}