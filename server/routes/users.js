import express from 'express'

import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'
import { getUserPosts } from '../controllers/posts.js'

const router = express.Router()

/* Read */
router.get('/:id',verifyToken,getUser)
router.get('/:id/friends',verifyToken,getUserFriends)
router.get("/:userId/posts", verifyToken, getUserPosts);

// Update
router.patch('/:id/:friendId',verifyToken,addRemoveFriend)


export default router;