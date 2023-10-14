const Servicios = require("../Models/servicio.model");
const createServ = async (req, res) => {
    try {
        const {
            name, descripcion, precio
        } = req.body;

        const servicio = new Servicios({
            name, descripcion, precio
        });
        await servicio.save();
        res.status(201)
        res.json({ message: "Servicio registrado con exito" })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "ha ocurrido un problema con el servidor" })
    }
}
const mostrarServi = async (req, res) => {
    try {
        const nameRegex = new RegExp(req.query.name);
        const filters = {
            name: {
                $regex: nameRegex,
            }
        };
        const servicio = await Servicios.find(filters);
        res.json({ message: "Servicios encontrados", data: servicio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
}
const mostrarIdServi = async (req, res) => {
    try {
        const servicio = await Servicios.findById(req.params.id);
        if (servicio === null) {
            res.status(404);
            return res.json({ message: "Servicio no encontrado" });
        }
        res.json({ message: "FIND Servicio BY ID", data: servicio });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
}
const actualizarServi = async (req, res) => {
    try {
        const servicio = await Servicios.findById(req.params.id);
        if (servicio === null) {
            res.status(404);
            return res.json({ message: "Servicio no encontrado" });
        }
        await Servicios.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            descripcion: req.body.descripcion,
            precio: req.body.precio
        });
        res.json({ message: "Servicio actualizado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};
const EliminarServicio = async (req, res) => {
    try {
        const servicio = await Servicios.findById(req.params.id);
        if (servicio === null) {
            res.status(404);
            return res.json({ message: "Servicio no encontrado" });
        }
        const filters = { _id: req.params.id };
        const deletedDocuments = await Servicios.deleteOne(filters);
        res.json({ message: "Servicio: " + servicio.name + " eliminado" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Ha ocurrido un error en el servidor" });
    }
};

module.exports = {createServ, mostrarServi, mostrarIdServi, actualizarServi, EliminarServicio}