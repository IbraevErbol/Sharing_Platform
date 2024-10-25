import express from 'express'
import { newPost, getPosts, getPostId, updatePost, deletePost, getPostsByUserId } from '../Controllers/postsController.js';
import upload from '../Middleware/uploadMiddleware.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = express.Router();

router.post('/posts', upload.single('image'), newPost)
router.get('/posts', getPosts)
router.get('/posts/:id', getPostId)
router.get('/posts/user/:id', getPostsByUserId)
router.put('/posts/:id',  upload.single('image'), updatePost)
router.delete('/posts/:id', deletePost)


export default router;