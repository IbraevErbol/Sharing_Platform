import express from 'express'
import { getUsers, registerUser, profileUser } from "../Controllers/userController.js";
const router = express.Router();

router.get("/users", getUsers);
router.post('/users', registerUser)
router.get('/users/:id', profileUser)



export default router;