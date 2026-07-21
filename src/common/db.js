import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://eva3_express:pSxa1DTGJlxwgqTw@cluster-express.m9dteos.mongodb.net/cine-db?appName=cluster-express";
const client = new MongoClient(uri);

export const connectDB = async () => {
    await client.connect();
    return client.db("cine-db");
};

export const getClient = () => client;


