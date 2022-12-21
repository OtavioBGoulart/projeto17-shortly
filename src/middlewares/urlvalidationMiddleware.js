import urlSchema from "../schemas/urlSchema.js";

export async function URLValidate(req, res, next) {
    const url = req.body

    const { error } = urlSchema.validate(url)
    if (error) return res.status(422).status(error);

    next();
}