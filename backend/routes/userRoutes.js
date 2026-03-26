import express from "express";
const router = express.Router();
import { validateRegister,validateLogin } from "../middleware/validation.js";

import {
    registerUser,
    loginUser
} from "../controllers/userController.js";

router.post("/register", validateRegister,registerUser);
router.post("/login", validateLogin ,loginUser);

export default router;