import jwt from "jsonwebtoken";


export function authorization(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "").trim();
    if (!token) return res.sendStatus(401);
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
        //console.log(decoded);
        next();
      } catch (error) {
        console.log(error);
        res.status(401).send("Token inválido");
      }
}