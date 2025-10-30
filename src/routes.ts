import { Router } from "express";
import { getDB } from "./BaseDatos";


const router = Router();
const collecion = () => getDB().collection("Clase1")

router.get("/", async (req, res) => {
    try{
        const albums = await collecion().find().toArray();
        res.json(albums);

    }catch(err){
        res.status(404).json({error: "No hay maní"})
    }
});

export default router;