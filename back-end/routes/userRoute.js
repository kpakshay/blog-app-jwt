import express from 'express'
import { getCurrentUserProfile,loginUser,registerUser,logOutUser,home } from '../controller/userController.js'
import protect from '../middlewares/authMiddleware.js'

const router= express.Router()

router.post('/login', loginUser)
router.post('/register', registerUser)
router.post('/logout', logOutUser)
router.post('/profile',protect,getCurrentUserProfile)
router.get('/home',home)

export default router;