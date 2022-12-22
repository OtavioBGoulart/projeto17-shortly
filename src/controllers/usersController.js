import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { connectionDB } from "../database/db.js";


export async function signUp(req, res) {
    const { name, email, password }  = req.body;

    try {
        const hashPassword = bcrypt.hashSync(password, 11);
        await connectionDB.query(`
            INSERT INTO users (name, email, password) VALUES ($1, $2, $3)
        ;`, [name, email, hashPassword])
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    console.log(req.signInData)
    const { id, name } = req.signInData;

    const token = jwt.sign(
        { user_id: id, name },
        process.env.TOKEN_KEY,
        {
          expiresIn: 60 * 60 * 12,
        }
      )

      res.status(200).send({ token });
}

export async function myUrls(req, res) {
    const user = req.user;

    try {
        const myUrls = await connectionDB.query(`
            SELECT id, short_url, url, visit_count FROM urls
            WHERE user_id = $1
        ;`, [user.user_id])

        console.log(myUrls.rows);
        const shortenedUrls = myUrls.rows

        res.status(200).send({id: user.user_id, name: user.name, shortenedUrls });
        
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }

}


