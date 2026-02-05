import { useState, useEffect } from 'react';
import { Container, Box, Typography, CircularProgress, Alert } from '@mui/material';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import api from '../api/axios';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const { data } = await api.get('/posts');
            setPosts(data);
        } catch (err) {
            console.error('Error fetching posts:', err);
            setError('Failed to load feed. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handlePostUpdate = (updatedPost) => {
        setPosts(posts.map(p => p._id === updatedPost._id ? updatedPost : p));
    };

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Container maxWidth="sm" sx={{ mt: 4, pb: 4 }}>
            <CreatePost onPostCreated={handlePostCreated} />

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

            {posts.length === 0 && !error ? (
                <Box sx={{ textAlign: 'center', mt: 4 }}>
                    <Typography variant="h6" color="textSecondary">
                        No posts yet. Be the first to post!
                    </Typography>
                </Box>
            ) : (
                posts.map(post => (
                    <PostCard
                        key={post._id}
                        post={post}
                        onPostUpdated={handlePostUpdate}
                    />
                ))
            )}
        </Container>
    );
};

export default Feed;
