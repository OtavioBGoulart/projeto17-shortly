import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { connectionDB } from "../database/db.js";


export async function signUp(req, res) {
    const { username, email, password }  = req.body;

    try {
        const hashPassword = bcrypt.hashSync(password, 11);
        await connectionDB.query(`
            INSERT INTO users (username, email, password) VALUES ($1, $2, $3)
        ;`, [username, email, hashPassword])
        res.sendStatus(201);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
    console.log(req.signInData)
    const { id, email } = req.signInData;

    const token = jwt.sign(
        { user_id: id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: 60 * 60 * 12,
        }
      )

      res.status(200).send({ token });
}

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const  user  = req.user;
    console.log(user, url);

    try {
        const shortUrl = nanoid(6);

        await connectionDB.query(`
            INSERT INTO urls (url, short_url, visit_count, user_id)
            VALUES ($1, $2, $3, $4)
        ;`, [url, shortUrl, 0, user.user_id])

        res.status(201).send({ shortUrl });

    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getUrlById(req, res) {

    const { id } = req.params;
    console.log(id)
    try {
        const urls = await connectionDB.query(`
            SELECT * FROM urls
            WHERE id = $1
        ;`, [id])

        if (urls.rowCount === 0) return res.sendStatus(404);

        console.log(urls.rows[0]);
        const { short_url, url} = urls.rows[0];
        res.status(200).send({ id, shortUrl: short_url, url});

    } catch(error) {
        console.log(error);
        return res.sendStatus(500);
    }
}