const Reserva = require('../Models/reservas.model');
const Turnos = require('../Models/turno.model');

const crearReserva = async (req, res) => {
    try {
        const { turnoId, clienteId, otrosDetalles } = req.body;

        // Verificar si el turno está disponible
        const turno = await Turnos.findById(turnoId);
        if (!turno || !turno.disponible) {
            return res.status(400).json({ message: 'El turno no está disponible' });
        }

        // Crear la reserva
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
        const reservas = await Reserva.find().populate('turno cliente');
        res.status(200).json(reservas);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al recuperar las reservas' });
    }
};
const actualizarReserva = async (req, res) => {
    try {
        const reservaId = req.params.id;
        const nuevosDatos = req.body;

        // Verificar si la reserva existe y si el cliente tiene permiso para actualizarla

        await Reserva.findByIdAndUpdate(reservaId, nuevosDatos);

        res.json({ message: 'Reserva actualizada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al actualizar la reserva' });
    }
};
const cancelarReserva = async (req, res) => {
    try {
        const reservaId = req.params.id;

        // Obtener la reserva y el turno asociado
        const reserva = await Reserva.findById(reservaId);
        if (!reserva) {
            return res.status(404).json({ message: 'Reserva no encontrada' });
        }

        const turno = await Turnos.findById(reserva.turno);
        if (turno) {
            turno.disponible = true; // Actualizar la disponibilidad del turno a true
            await turno.save();
        }

        await Reserva.findByIdAndRemove(reservaId);

        res.json({ message: 'Reserva cancelada con éxito' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al cancelar la reserva' });
    }
};

// const historialReservas = async (req, res) => {
//     try {
//         // Buscar todas las reservas sin restricción por cliente
//         const reservas = await Reserva.find().populate('turno');
        
//         res.status(200).json(reservas);
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ message: 'Error al obtener el historial de reservas' });
//     }
// };

module.exports = {
    crearReserva,
    mostrarReservas,
    actualizarReserva,
    cancelarReserva,
}