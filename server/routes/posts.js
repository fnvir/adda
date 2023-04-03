import express from "express";
import { getFeedPosts, likePost, createPost, commentPost, getComments} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from '../middleware/filemanager.js'


const router = express.Router();

// READ 
router.get("/", verifyToken, getFeedPosts)
router.get("/:id/comments", getComments);

// Post
router.post('/', verifyToken, upload.single('picture'), createPost)
/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

export default router;