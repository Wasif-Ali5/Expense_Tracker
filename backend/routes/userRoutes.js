import express from "express";
const router = express.Router();
import { validateUser } from "../middleware/validation.js";

import {
    registerUser,
    loginUser
} from "../controllers/userController.js";

router.post("/register", validateUser,registerUser);
router.post("/login",validateUser ,loginUser);

export default router;