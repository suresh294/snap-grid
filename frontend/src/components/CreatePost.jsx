import { useState, useRef } from 'react';
import {
    Button,
    TextField,
    Card,
    CardContent,
    Box,
    Alert,
    Typography,
    Collapse,
    IconButton
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import SendIcon from '@mui/icons-material/Send';
import CloseIcon from '@mui/icons-material/Close';
import api from '../api/axios';

const CreatePost = ({ onPostCreated }) => {
    const [caption, setCaption] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Reference to the hidden file input
    const fileInputRef = useRef(null);

    // Check if post can be submitted
    const canPost = caption.trim() !== '' || imageFile !== null;

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                setError('Please select an image file');
                return;
            }
            setImageFile(file);
            setPreviewUrl(URL.createObjectURL(file));
            setError('');
        }
    };

    const handleRemoveImage = () => {
        setImageFile(null);
        setPreviewUrl('');
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!canPost) {
            setError('Please add a caption or an image');
            return;
        }

        setLoading(true);
        try {
            // Create FormData object for multipart/form-data request
            const formData = new FormData();
            formData.append('caption', caption);
            if (imageFile) {
                formData.append('image', imageFile);
            }

            const { data } = await api.post('/posts', formData);

            // Reset form
            setCaption('');
            handleRemoveImage();

            // Notify parent to refresh feed
            if (onPostCreated) {
                onPostCreated(data);
            }
        } catch (err) {
            console.error('Error creating post:', err);
            setError(err.response?.data?.message || 'Failed to create post');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card sx={{ maxWidth: 600, width: '100%', mb: 4, mx: 'auto', p: 1 }} variant="outlined">
            <CardContent>
                <Typography variant="h6" sx={{ mb: 2, fontFamily: 'Grand Hotel, cursive' }}>
                    Create New Post
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        placeholder="What's on your mind?"
                        multiline
                        rows={2}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                        variant="outlined"
                        size="small"
                        sx={{ mb: 2 }}
                    />

                    {/* Image Preview */}
                    <Collapse in={!!previewUrl}>
                        <Box sx={{ position: 'relative', mb: 2, width: '100%' }}>
                            <Box
                                component="img"
                                src={previewUrl}
                                alt="Preview"
                                sx={{
                                    width: '100%',
                                    maxHeight: 300,
                                    objectFit: 'contain',
                                    borderRadius: 1,
                                    bgcolor: '#f0f0f0'
                                }}
                            />
                            <IconButton
                                size="small"
                                onClick={handleRemoveImage}
                                sx={{
                                    position: 'absolute',
                                    top: 5,
                                    right: 5,
                                    bgcolor: 'rgba(0,0,0,0.5)',
                                    color: 'white',
                                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                                }}
                            >
                                <CloseIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    </Collapse>

                    {/* Hidden File Input */}
                    <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileSelect}
                    />

                    {/* Helper Text */}
                    {!canPost && (
                        <Typography
                            variant="caption"
                            sx={{
                                display: 'block',
                                mb: 1.5,
                                color: 'text.secondary',
                                fontStyle: 'italic',
                                textAlign: 'center'
                            }}
                        >
                            Add a caption or image to post
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Button
                            startIcon={<AddPhotoAlternateIcon />}
                            onClick={() => fileInputRef.current.click()}
                            size="small"
                            color="primary"
                        >
                            Add Photo
                        </Button>

                        <Button
                            variant="contained"
                            endIcon={<SendIcon />}
                            type="submit"
                            disabled={loading || !canPost}
                            size="small"
                        >
                            {loading ? 'Posting...' : 'Post'}
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default CreatePost;
