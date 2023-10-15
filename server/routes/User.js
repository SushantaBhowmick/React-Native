import express from 'express';
import { addTask, forgotPassword, getAllUsers, getMyProfile, login, logout, register, removeTask, resetPassword, updatePassword, updateProfile, updateTask, verify } from '../controllers/User.js';
import { isAuthenticated } from '../middleware/auth.js';
const router = express.Router();

router.route("/register").post(register);
router.route("/verify").post(isAuthenticated, verify);
router.route("/users").get(getAllUsers);
router.route("/login").post(login);
router.route("/logout").get(isAuthenticated,logout);
router.route("/me").get(isAuthenticated,getMyProfile);
router.route("/updateprofile").put(isAuthenticated,updateProfile);
router.route("/updatepassword").put(isAuthenticated,updatePassword);
//tasks
router.route("/newtask").post(isAuthenticated,addTask);
router.route("/task/:taskId").get(isAuthenticated,updateTask);
router.route("/task/:taskId").delete(isAuthenticated,removeTask);

//forgot password 
router.route("/forgotpassword").post(forgotPassword);
router.route("/resetpassword").put(resetPassword);



export default router;