import { connectionDB } from "../database/db.js";

export async function urlBelongsUser(req, res, next) {
    const user = req.user;
    console.log(user)
    const urlId = req.params.id;

    try {
        
        const urlExist = await connectionDB.query(`
        SELECT * FROM urls WHERE id = $1 
    ;`, [urlId])
        if (urlExist.rowCount === 0) return res.sendStatus(404)

        const urlUser = await connectionDB.query(`
            SELECT * FROM urls WHERE id = $1 AND user_id = $2
        ;`, [urlId, user.user_id])

        if (urlUser.rowCount === 0) return res.sendStatus(401)

       next();

    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}