import { getClient } from '../common/db.js';
import { ObjectId } from 'mongodb';

const peliculaCollection = getClient().db("cine-db").collection("peliculas");

export const handleInsertPeliculaRequest = async (req, res) => {
    try {
        const result = await peliculaCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error genérico" });
    }
};

export const handleGetPeliculasRequest = async (req, res) => {
    try {
        const peliculas = await peliculaCollection.find({}).toArray();
        res.status(200).json(peliculas);
    } catch (error) {
        res.status(500).json({ error: "Error genérico" });
    }
};

export const handleGetPeliculaByIdRequest = async (req, res) => {
    try {
        const id = req.params.id;
        const pelicula = await peliculaCollection.findOne({ _id: new ObjectId(id) });
        if (!pelicula) return res.status(404).json({ error: "Película no encontrada" });
        res.status(200).json(pelicula);
    } catch (error) {
        res.status(400).json({ error: "Id mal formado" });
    }
};

export const handleUpdatePeliculaByIdRequest = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await peliculaCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: req.body }
        );
        if (result.matchedCount === 0) return res.status(404).json({ error: "Película no encontrada" });
        res.status(200).json({ mensaje: "Película actualizada con éxito" });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado" });
    }
};

export const handleDeletePeliculaByIdRequest = async (req, res) => {
    try {
        const id = req.params.id;
        const result = await peliculaCollection.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount === 0) return res.status(404).json({ error: "Película no encontrada" });
        res.status(200).json({ mensaje: "Película eliminada" });
    } catch (error) {
        res.status(400).json({ error: "Id mal formado" });
    }
};