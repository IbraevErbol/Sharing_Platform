import express from 'express'
import { getUsers, registerUser, profileUser, loginUser, refreshAccessToken} from "../Controllers/userController.js";
import { checkAuth } from '../utils/checkAuth.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get("/users", getUsers); //Для разработчика 
router.get('/profile/:id', checkAuth, profileUser)
router.post('/refresh-token', refreshAccessToken);


export default router;