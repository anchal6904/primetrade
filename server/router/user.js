import { Router } from "express";
import { login,signup,getProfile,updateProfile } from "../controllers/user.js";
import middleware from "../middleware.js";


const router=Router();

router.post('/login',login)
router.post('/signup',signup)
router.get('/profile',middleware,getProfile)
router.put('/profile',middleware,updateProfile)

export default router;

