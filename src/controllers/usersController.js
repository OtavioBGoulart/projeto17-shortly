import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";


export async function signUp(req, res) {
    const { name, email, password }  = req.body;

    try {
        const hashPassword = bcrypt.hashSync(password);
        await connectionDB.query(`
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
        ;`, [name, email, hashPassword])
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}