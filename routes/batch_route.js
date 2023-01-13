import express from "express";
import { addBatch, getBatch } from "../controller/batch_controller.js";
import { authenticated } from "../middleware/auth.js";


const router = express.Router();

router.post('/add', authenticated, addBatch);
router.get('/get', authenticated, getBatch)

export default router