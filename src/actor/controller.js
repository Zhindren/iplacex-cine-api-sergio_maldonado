import { getClient } from '../common/db.js';
import { ObjectId } from 'mongodb';

const actorCollection = getClient().db("cine-db").collection("actores");
const peliculaCollection = getClient().db("cine-db").collection("peliculas");

export const handleInsertActorRequest = async (req, res) => {
    try {
        const pelicula = await peliculaCollection.findOne({ nombre: req.body.idPelicula });
        if (!pelicula) {
            return res.status(404).json({ error: "La película asignada no existe" });
        }

        const result = await actorCollection.insertOne(req.body);
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Error genérico" });
    }
};

export const handleGetActoresRequest = async (req, res) => {
    try {
        const actores = await actorCollection.find({}).toArray();
        res.status(200).json(actores);
    } catch (error) {
        res.status(500).json({ error: "Error genérico" });
    }
};

export const handleGetActorByIdRequest = async (req, res) => {
    try {
        const id = req.params.id;
        const actor = await actorCollection.findOne({ _id: new ObjectId(id) });
        if (!actor) return res.status(404).json({ error: "Actor no encontrado" });
        res.status(200).json(actor);
    } catch (error) {
        res.status(400).json({ error: "Id mal formado" });
    }
};

export const handleGetActoresByPeliculaRequest = async (req, res) => {
    try {
        const idPelicula = req.params.pelicula;
        const actores = await actorCollection.find({ idPelicula: idPelicula }).toArray();
        res.status(200).json(actores);
    } catch (error) {
        res.status(500).json({ error: "Error genérico" });
    }
};