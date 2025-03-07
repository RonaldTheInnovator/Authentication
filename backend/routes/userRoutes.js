import express from 'express';
import { forgotPassword, login, logout, register, resetPassword, verifyAuth, verifyEmail } from '../controllers/userController.js';
import { verifyToken } from '../middleware/verifyToken.js';
const router = express.Router();

// app.post("/register",register);

router.route("/verifyAuth").get(verifyToken,verifyAuth)

router.route("/register").post(register);
router.route("/verifyEmail").post(verifyEmail)
router.route("/logout").post(logout);
router.route("/login").post(login);
router.route("/forgotPassword").post(forgotPassword);
router.route("/resetPassword/:token").post(resetPassword);

export default router
