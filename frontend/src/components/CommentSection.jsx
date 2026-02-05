import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Divider,
    IconButton,
    Collapse
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import api from '../api/axios';

const CommentSection = ({ postId, comments, onCommentAdded, expanded, onClose }) => {
    const [newComment, setNewComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        setLoading(true);
        try {
            const { data } = await api.post(`/posts/${postId}/comment`, {
                text: newComment
            });
            onCommentAdded(data); // data is the updated array of comments
            setNewComment('');
        } catch (error) {
            console.error('Error posting comment:', error);
        } finally {
            setLoading(false);
        }
    };

    if (!expanded) return null;

    return (
        <Box sx={{ mt: 2, borderTop: '1px solid #efefef', pt: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, mb: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                    Comments ({comments.length})
                </Typography>
                <IconButton size="small" onClick={onClose}>
                    <CloseIcon fontSize="small" />
                </IconButton>
            </Box>

            <List sx={{
                maxHeight: 300,
                overflow: 'auto',
                bgcolor: 'background.paper',
                mb: 2,
                px: 1
            }}>
                {comments.length === 0 && (
                    <Typography variant="body2" color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                        No comments yet. Start the conversation!
                    </Typography>
                )}

                {comments.map((comment, index) => (
                    <ListItem alignItems="flex-start" key={index} sx={{ py: 1 }}>
                        <ListItemAvatar sx={{ minWidth: 40, mr: 1 }}>
                            <Avatar
                                sx={{ width: 32, height: 32, fontSize: 14 }}
                                alt={comment.username}
                                src="/static/images/avatar/1.jpg" // Placeholder for now
                            >
                                {comment.username ? comment.username[0].toUpperCase() : '?'}
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Typography variant="subtitle2" component="span" sx={{ fontWeight: 'bold' }}>
                                    {comment.username}
                                </Typography>
                            }
                            secondary={
                                <Box component="span">
                                    <Typography variant="body2" component="span" color="text.primary" sx={{ display: 'block', wordBreak: 'break-word' }}>
                                        {comment.text}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(comment.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            <Divider />

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 1, p: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    disabled={loading}
                />
                <Button
                    type="submit"
                    disabled={!newComment.trim() || loading}
                    color="primary"
                    sx={{ fontWeight: 'bold', minWidth: 'auto' }}
                >
                    Post
                </Button>
            </Box>
        </Box>
    );
};

export default CommentSection;
