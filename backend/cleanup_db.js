import mongoose from 'mongoose';
import Post from './src/models/post.js';
import dotenv from 'dotenv';
dotenv.config();

const cleanup = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to DB');

        // Delete posts with missing username
        const result = await Post.deleteMany({
            $or: [
                { username: { $exists: false } },
                { username: null },
                { username: "" }
            ]
        });

        console.log(`Deleted ${result.deletedCount} corrupted posts.`);

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

cleanup();
