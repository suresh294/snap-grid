import mongoose from 'mongoose';
import Post from './src/models/post.js';
import dotenv from 'dotenv';
dotenv.config();

const checkLatestPost = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const post = await Post.findOne().sort({ createdAt: -1 });
        console.log('Latest Post:', JSON.stringify(post, null, 2));
        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

checkLatestPost();
