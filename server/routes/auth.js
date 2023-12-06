import express from "express";
import {guestlogin, login,register} from '../controllers/auth.js'
import {upload} from '../middleware/filemanager.js'


const router=express.Router()


router.post('/login',login)
router.post('/guestlogin',guestlogin)
router.post('/register',upload.single('picture'),register)

export default router;

