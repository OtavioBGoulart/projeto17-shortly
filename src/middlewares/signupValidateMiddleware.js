import signupSchema from "../schemas/signUpSchema.js";
import { connectionDB } from "../database/db.js";


export async function signUpValidation(req, res, next) {
    const { name, email, password, confirmedPass } = req.body;
    const signUpData = req.body;

    const { error } = signupSchema.validate(signUpData, { abortEarly: false });

        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.status(422).send( {message: errors });
        }

    if (password !== confirmedPass) {
        return res.status(409).send({ message: "As duas senhas devem ser iguais" })
    }

    try {
        const userExist = await connectionDB.query(`
            SELECT * FROM users WHERE email = $1;
        `, [email])
        
        if (userExist.rowCount > 0) return res.status(409).send( { message: "Esse email já existe"});

        delete signUpData.confirmedPass;
        req.signUpData = signUpData;



    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }

    next();
}