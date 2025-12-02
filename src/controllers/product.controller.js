const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const filePath = path.join(__dirname, "../data/products.json");

const leerLibros = () => {
    try {
        const data = fs.readFileSync(filePath, "utf-8");
        return JSON.parse(data);
    } catch (error) {

        if (error.code === 'ENOENT' || data === '') {
            return [];
        }
        throw error;
    }
}

const escribirLibros = (libros) => {
    fs.writeFileSync(filePath, JSON.stringify(libros, null, 2));
}

const agregarLibro = (req, res) => {

    try {
        const { titulo, autor, precio } = req.body;

        if (!titulo || !autor || !precio) {
            return res.status(400).json({
                ok: false,
                message: "Faltan datos obligatorios (titulo, autor, precio)"
            })
        }

        const libros = leerLibros();
        const existe = libros.find((l) => l.titulo === titulo);

        if (existe) {
            return res.status(400).json({
                ok: false,
                message: 'El libro ya existe en la base de datos'
            })
        }

        const nuevoLibro = {
            id : crypto.randomUUID(),
            titulo,
            autor,
            precio: Number(precio)
        }

        libros.push(nuevoLibro);
        escribirLibros(libros);

        return res.status(201).json({
            ok: true,
            message: "Libro agregado correctamente",
            libro: {
                id: nuevoLibro.id,
                titulo: nuevoLibro.titulo,
                autor: nuevoLibro.autor,
                precio: nuevoLibro.precio
            }
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }

}

const listarLibros = (req, res) => {

    try {
        
        const libros = leerLibros();

        if (libros.length === 0) {
            return res.status(404).json({
                ok: false,
                message: "No hay libros disponibles"
            })
        }

        return res.status(200).json({
            ok: true,
            message: "Lista de libros obtenida correctamente",
            data: {
                length: libros.length,
                libros
            }
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }

}

const modificarLibro = (req, res) => {
    try {
        const { id } = req.params; 
        const { titulo, autor, precio } = req.body; 

        const libros = leerLibros();
        const index = libros.findIndex(l => l.id === id);

        if (index === -1) {
            return res.status(404).json({
                ok: false,
                message: 'Libro no encontrado para actualizar.'
            });
        }

        const libroActualizado = {
            ...libros[index],
            titulo: titulo || libros[index].titulo,
            autor: autor || libros[index].autor,
            precio: precio ? Number(precio) : libros[index].precio
        };

        libros[index] = libroActualizado;
        escribirLibros(libros);

        return res.status(200).json({
            ok: true,
            message: 'Libro actualizado correctamente',
            libro: libroActualizado
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

const eliminarLibro = (req, res) => {
    try {
        const { id } = req.params; 

        const libros = leerLibros();
        const initialLength = libros.length;
        const librosFiltrados = libros.filter(l => l.id !== id);

        if (initialLength === librosFiltrados.length) {
            return res.status(404).json({
                ok: false,
                message: 'Libro no encontrado para eliminar.'
            });
        }

        escribirLibros(librosFiltrados);

        return res.status(200).json({
            ok: true,
            message: 'Libro eliminado correctamente',
            deletedId: id
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json(error.message);
    }
}

module.exports = {
    agregarLibro,
    listarLibros,
    modificarLibro,
    eliminarLibro
}