import { connectionDB } from "../database/db.js";
import { nanoid } from "nanoid";

export async function shortenUrl(req, res) {
    const { url } = req.body;
    const user = req.user;
    console.log(user, url);

    try {
        const shortUrl = nanoid(6);

        await connectionDB.query(`
            INSERT INTO urls (url, short_url, visit_count, user_id)
            VALUES ($1, $2, $3, $4)
        ;`, [url, shortUrl, 0, user.user_id])

        res.status(201).send({ shortUrl });

    } catch (error) {
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
        const { short_url, url } = urls.rows[0];
        res.status(200).send({ id, shortUrl: short_url, url });

    } catch (error) {
        console.log(error);
        return res.sendStatus(500);
    }
}

export async function redirectToUrl(req, res) {
    const { shortUrl } = req.params;
    console.log(shortUrl)

    try {
        const shortUrlExist = await connectionDB.query(`
            SELECT * FROM urls WHERE short_url = $1
        ;`, [shortUrl])    
        console.log(shortUrlExist)    
        if (shortUrlExist.rowCount === 0) return res.status(400).send("Url Inexistente")

        await connectionDB.query(`
            UPDATE urls SET visit_count = visit_count + 1
            WHERE short_url = $1    
        ;`, [shortUrl])

        const { url } = shortUrlExist.rows[0];
        res.redirect(url);


    } catch (error) {
        console.log(error);
        res.sendStatus(500);
    }

}

export async function deleteUrl(req, res) {
    const { id } = req.params;

    try {
        await connectionDB.query(`
        DELETE FROM urls WHERE id = $1
    ;`, [id])

    res.sendStatus(204);
        
    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}