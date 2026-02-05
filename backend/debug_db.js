import mongoose from 'mongoose';
import User from './src/models/user.js';
import Post from './src/models/post.js';
import dotenv from 'dotenv';
dotenv.config();

const debug = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        const users = await User.find({});
        console.log('Users:', JSON.stringify(users, null, 2));

        const posts = await Post.find({});
        console.log('Posts:', JSON.stringify(posts, null, 2));

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

debug();
