import { connectionDB } from "../database/db.js";

export async function validateUser(req, res, next) {
    const user = req.user;

    try {
        const userExist = await connectionDB.query(`
            SELECT * FROM users WHERE id = $1
        ;`, [user.user_id])
        if (userExist.rowCount === 0) return res.status(404).send("Usuario não existe");

        next();

    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}