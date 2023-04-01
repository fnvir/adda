import express from "express";
import { getFeedPosts, getUserPosts, likePost, createPost, commentPost} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from '../middleware/filemanager.js'


const router = express.Router();

// READ 
router.get("/", verifyToken, getFeedPosts)
router.get("/:userId/posts", verifyToken, getUserPosts);
// Post
router.post('/', verifyToken, upload.single('picture'), createPost)
/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);

export default router;