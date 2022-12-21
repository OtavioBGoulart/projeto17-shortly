import express from "express";
import cors from "cors";
import usersRouters from "./routes/usersRoutes.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(usersRouters);


const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`Server running in port ${port}`));