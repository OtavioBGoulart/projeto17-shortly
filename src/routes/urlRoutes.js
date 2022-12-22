import { Router } from "express";
import { URLValidate } from "../middlewares/urlvalidationMiddleware.js";
import { authorization } from "../middlewares/authMiddleware.js";
import { deleteUrl, getUrlById, redirectToUrl, shortenUrl } from "../controllers/urlsControllers.js";
import { urlBelongsUser } from "../middlewares/deleteAuthorizationMiiddleware.js";

const router = Router();

router.post("/urls/shorten", authorization, URLValidate, shortenUrl);
router.get("/urls/:id", getUrlById);
router.get("/open/:shortUrl", redirectToUrl);
router.delete("/urls/:id", authorization, urlBelongsUser, deleteUrl);


export default router;