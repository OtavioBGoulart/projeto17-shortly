import bcrypt from "bcrypt";

export async function singInValidation(req, res, next)  {

    const { email, password } = req.body;

    try { 
        const userExist = await connectionDB.query(`
        SELECT * FROM users WHERE email = $1;
        `, [email])
        if (userExist.rowCount === 0) return res.sendStatus(401);

        const passwordCompare = bcrypt.compare(password, userExist.password);
        if (!passwordCompare) return res.sendStatus(401);

        req.singInData = userExist.rows[0];

    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }

    next();
}