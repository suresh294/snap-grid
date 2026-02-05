import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardMedia,
    CardContent,
    CardActions,
    Avatar,
    IconButton,
    Typography,
    Box,
    Divider
} from '@mui/material';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import CommentSection from './CommentSection';

const PostCard = ({ post, onPostUpdated }) => {
    const { user } = useAuth();
    const [likeLoading, setLikeLoading] = useState(false);
    const [showComments, setShowComments] = useState(false);

    const isLiked = post.likes.some(like => like.userId === user._id);

    const handleLike = async () => {
        if (likeLoading) return;
        setLikeLoading(true);
        try {
            const { data } = await api.post(`/posts/${post._id}/like`);
            // Update the post object with new likes array and notify parent
            onPostUpdated({ ...post, likes: data });
        } catch (error) {
            console.error('Error liking post:', error);
        } finally {
            setLikeLoading(false);
        }
    };

    const handleCommentsUpdate = (updatedComments) => {
        onPostUpdated({ ...post, comments: updatedComments });
    };

    return (
        <Card sx={{ maxWidth: 600, width: '100%', mb: 4, mx: 'auto', boxShadow: 'none', border: '1px solid #dbdbdb' }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                        {post.username ? post.username[0].toUpperCase() : '?'}
                    </Avatar>
                }
                title={
                    <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                        {post.username}
                    </Typography>
                }
                subheader={new Date(post.createdAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                })}
            />
            {post.imageUrl && (
                <CardMedia
                    component="img"
                    image={post.imageUrl}
                    alt={post.caption || 'Post image'}
                    sx={{
                        width: '100%',
                        height: 'auto',
                        aspectRatio: '1/1',
                        objectFit: 'cover'
                    }}
                />
            )}
            <CardActions disableSpacing sx={{ pt: 1, pb: 0 }}>
                <IconButton onClick={handleLike} disabled={likeLoading}>
                    {isLiked ? <FavoriteIcon sx={{ color: red[500] }} /> : <FavoriteBorderIcon />}
                </IconButton>
                <IconButton
                    aria-label="comment"
                    onClick={() => setShowComments(!showComments)}
                >
                    <ChatBubbleOutlineIcon />
                </IconButton>
            </CardActions>

            <Box sx={{ px: 2, pb: 2 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mb: 0.5 }}>
                    {post.likes.length} likes
                </Typography>

                {post.caption && (
                    <Typography variant="body2" color="text.primary" component="p">
                        <Box component="span" sx={{ fontWeight: 'bold', mr: 1 }}>
                            {post.username}
                        </Box>
                        {post.caption}
                    </Typography>
                )}

                {post.comments.length > 0 && !showComments && (
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mt: 1, cursor: 'pointer' }}
                        onClick={() => setShowComments(true)}
                    >
                        View all {post.comments.length} comments
                    </Typography>
                )}

                <CommentSection
                    postId={post._id}
                    comments={post.comments}
                    onCommentAdded={handleCommentsUpdate}
                    expanded={showComments}
                    onClose={() => setShowComments(false)}
                />
            </Box>
        </Card>
    );
};

export default PostCard;
