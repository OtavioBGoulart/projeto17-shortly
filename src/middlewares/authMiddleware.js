import jwt from "jsonwebtoken";


export function authorization(req, res, next) {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (!token) return res.sendStatus(401);
    
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        req.user = decoded;
      } catch (error) {
        console.log(error);
        return res.status(401).send("Token inválido");
      }
      return next();
    
}