import bcrypt from "bcrypt";
import { connectionDB } from "../database/db.js";

export async function singInValidation(req, res, next)  {

    const { email, password } = req.body;

    try { 
        const userExist = await connectionDB.query(`
        SELECT * FROM users WHERE email = $1;
        `, [email])
        if (userExist.rowCount === 0) return res.sendStatus(401);

        const passwordCompare = bcrypt.compareSync(password, userExist.rows[0].password);
        if (!passwordCompare) return res.sendStatus(401);

        //console.log(passwordCompare);
        console.log(userExist.rows[0])

        req.signInData = userExist.rows[0];

    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }

    next();
}