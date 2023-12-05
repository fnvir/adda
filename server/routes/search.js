import express from "express";
import { verifyToken } from "../middleware/auth.js";
import { searchInComments, searchInPost, searchUsers } from "../controllers/search.js";


const router = express.Router();

router.post('/users', verifyToken, searchUsers)
router.post("/posts", verifyToken, searchInPost);
router.post("/comments", verifyToken, searchInComments);


export default router;