import express from 'express'

import {
    getUser,
    getUserFriends,
    addRemoveFriend,
    getNonFriends,
} from '../controllers/users.js'
import { verifyToken } from '../middleware/auth.js'
import { getUserPosts } from '../controllers/posts.js'

const router = express.Router()

/* Read */
router.get('/:id',verifyToken,getUser)
router.get('/:id/friends',verifyToken,getUserFriends)
router.get('/:id/nearby',verifyToken,getNonFriends)
router.get("/:userId/posts", verifyToken, getUserPosts);

// Update
router.patch('/:id/friend/:friendId',verifyToken,addRemoveFriend)


export default router;