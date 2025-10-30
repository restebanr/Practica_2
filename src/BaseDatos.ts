import { Db, MongoClient } from "mongodb"

let client: MongoClient;
let db: Db;

export const connectToMongoDB = async(): Promise<void> => {
    try{
        const urlMongo = "mongodb+srv://estebanrodriguezruben:IBvAWxDWo18iYmGK@cluster0.8ivrdjk.mongodb.net/?appName=Cluster0";
        client = new MongoClient(urlMongo);
        await client.connect();

        db = client.db("DBClaseInicial");
        console.log("Conectado a mongo Maní!")

    }catch(err){
        console.error("Error al conectar a mongo");
        process.exit(1);
    }
};

export const getDB = () :Db => db;

