import express from "express";
import { getFeedPosts, createPost, editPost, commentPost, likePost, sharePost, deletePost, getComments} from "../controllers/posts.js";
import { verifyToken } from "../middleware/auth.js";
import { upload } from '../middleware/filemanager.js'


const router = express.Router();

// READ 
router.get("/", verifyToken, getFeedPosts)
router.get("/:id/comments", getComments);

// Post
router.post('/', verifyToken, upload.single('picture'), createPost)
router.post("/:id/share", verifyToken, upload.none(), sharePost);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.patch("/:id/comment", verifyToken, commentPost);
router.patch("/:id/edit", verifyToken, upload.single('picture'), editPost);
router.patch("/:id/delete", verifyToken, deletePost);

export default router;