import urlSchema from "../schemas/urlSchema.js";

export function URLValidate(req, res, next) {
    const url = req.body;


    const { error } = urlSchema.validate(url)
    if (error) {
        console.log(error.details[0].message)
        return res.status(422).send(error.details[0].message);
    }

    next();
}