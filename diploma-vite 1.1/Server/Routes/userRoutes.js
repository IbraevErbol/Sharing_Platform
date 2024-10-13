import express from 'express'
import { getUsers, registerUser, profileUser, loginUser} from "../Controllers/userController.js";
import { checkAuth } from '../utils/checkAuth.js';

const router = express.Router();

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get("/users",checkAuth, getUsers); //Для разработчика 
router.get('/profile/:id', checkAuth, profileUser)



export default router;