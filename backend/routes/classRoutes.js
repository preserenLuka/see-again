import express from "express";
import {
    createClass,
    getClassById,
    getAllClasses,
} from "../controllers/classController.js"

const router = express.Router();

router.post("/", createClass);
router.get("/", getAllClasses);
router.get("/:id", getClassById);

export default router;