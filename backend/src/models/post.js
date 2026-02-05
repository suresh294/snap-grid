import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        trim: true,
        maxlength: [2200, 'Caption cannot be more than 2200 characters']
    },
    imageUrl: {
        type: String,
        // Using simple validation for string presence if image is provided
        // In production with S3, this would be a URL validation
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    likes: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            username: {
                type: String,
                required: true
            }
        }
    ],
    comments: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
                required: true
            },
            username: {
                type: String,
                required: true
            },
            text: {
                type: String,
                required: [true, 'Comment text is required'],
                trim: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, {
    timestamps: true
});

// Validation to ensure post has content
postSchema.pre('validate', function (next) {
    if (!this.caption && !this.imageUrl) {
        next(new Error('Post must have either a caption or an image'));
    } else {
        next();
    }
});

export default mongoose.model('Post', postSchema);
