import Post from '../models/post.js';
import fs from 'fs';
import path from 'path';

const uploadDir = path.join(process.cwd(), 'uploads');

// Ensure uploads folder exists (PRODUCTION SAFE)
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// @desc    Create a new post
// @route   POST /api/posts
// @access  Private
export const createPost = async (req, res) => {
    try {
        console.log('Request Body:', req.body);
        console.log('Request File:', req.file);

        const { caption } = req.body;
        let imageUrl = req.body.imageUrl;

        // Check if file was uploaded
        if (req.file) {
            // Construct URL: http://localhost:5000/uploads/filename.jpg
            const baseUrl = `${req.protocol}://${req.get('host')}`;
            imageUrl = `${baseUrl}/uploads/${req.file.filename}`;
        }

        if (!caption && !imageUrl) {
            return res.status(400).json({ message: 'Post must include caption or image' });
        }

        // Save username and userId directly to post
        console.log('Creating post for user:', req.user);
        if (!req.user.username) {
            console.error('CRITICAL: User has no username!', req.user);
            return res.status(500).json({ message: 'User profile incomplete (missing username)' });
        }

        const post = await Post.create({
            userId: req.user._id,
            username: req.user.username,
            caption,
            imageUrl,
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get all posts (Public Feed)
// @route   GET /api/posts
// @access  Private (Auth required)
export const getPosts = async (req, res) => {
    try {
        // Sort by newest first
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Like a post (prevent duplicates)
// @route   POST /api/posts/:id/like
// @access  Private
export const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user has already liked this post
        const alreadyLiked = post.likes.some(
            (like) => like.userId.toString() === req.user._id.toString()
        );

        // If already liked, return without modification
        if (alreadyLiked) {
            return res.json(post.likes);
        }

        // Add new like with username (denormalized)
        post.likes.push({
            userId: req.user._id,
            username: req.user.username
        });

        await post.save();
        res.json(post.likes);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Comment on a post
// @route   POST /api/posts/:id/comment
// @access  Private
export const addComment = async (req, res) => {
    try {
        const { text } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (!text) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        // Add comment with username (denormalized)
        const comment = {
            userId: req.user._id,
            username: req.user.username,
            text,
            createdAt: new Date(),
        };

        post.comments.push(comment);

        await post.save();

        res.json(post.comments);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
