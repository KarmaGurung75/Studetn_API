
import express from "express";
import {
    login,
    register,
    userProfile,
    updateProfile
} from "../controller/user_controller.js";
import upload from "../controller/file.js";
import { authenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/register', upload.single("avatar"), register);
router.post('/login', login)
router.get('/profile', authenticated, userProfile)
router.put('/profile/update',
    authenticated,
    upload.single("avatar"),
    updateProfile)

export default router;