import express from "express";
import {
    addCourse,
    getCourse 
} from "../controller/course_controller.js";
import { authenticated } from "../middleware/auth.js";

const router = express.Router();

router.post('/add', authenticated, addCourse);
router.get('/get', authenticated, getCourse)

export default router;