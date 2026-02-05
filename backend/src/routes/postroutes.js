import express from 'express';
import { createPost, getPosts, likePost, addComment } from '../controllers/postcontroller.js';
import { protect } from '../middleware/authmiddleware.js';

const router = express.Router();

import upload from '../middleware/uploadMiddleware.js';

// Get all posts (Public feed)
router.route('/')
    .get(protect, getPosts)
    .post(protect, upload.single('image'), createPost);

// Like and Comment on posts
router.route('/:id/like').post(protect, likePost);
router.route('/:id/comment').post(protect, addComment);

export default router;
