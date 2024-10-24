import express from 'express'
import { newPost, getPosts, getPostId, updatePost, deletePost } from '../Controllers/postsController.js';
import upload from '../Middleware/uploadMiddleware.js';
import { checkAuth } from '../utils/checkAuth.js';

const router = express.Router();

router.post('/posts', upload.single('image'), newPost)
router.get('/posts', getPosts)
router.get('/posts/:id', getPostId)
router.put('/posts/:id', updatePost)
router.delete('/posts/:id', deletePost)


export default router;