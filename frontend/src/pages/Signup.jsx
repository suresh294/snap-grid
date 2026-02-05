import { useState } from 'react';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Alert,
    Link as MuiLink
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { signup } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await signup(formData.username, formData.email, formData.password);

        if (result.success) {
            navigate('/');
        } else {
            setError(result.error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        borderColor: 'grey.300'
                    }}
                >
                    <CameraAltIcon sx={{ fontSize: 48, mb: 1 }} />
                    <Typography component="h1" variant="h5" sx={{ fontFamily: 'Grand Hotel, cursive', mb: 1 }}>
                        SnapGrid
                    </Typography>
                    <Typography variant="body2" color="textSecondary" align="center" sx={{ mb: 3 }}>
                        Sign up to see photos and videos from your friends.
                    </Typography>

                    {error && <Alert severity="error" sx={{ width: '100%', mb: 2 }}>{error}</Alert>}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            size="small"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            name="username"
                            autoComplete="username"
                            value={formData.username}
                            onChange={handleChange}
                            size="small"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="new-password"
                            value={formData.password}
                            onChange={handleChange}
                            size="small"
                        />
                        <Typography variant="caption" color="textSecondary" sx={{ display: 'block', mt: 1, textAlign: 'center' }}>
                            By signing up, you agree to our Terms.
                        </Typography>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                    </Box>
                </Paper>

                <Paper
                    elevation={0}
                    variant="outlined"
                    sx={{
                        p: 2,
                        mt: 2,
                        width: '100%',
                        textAlign: 'center',
                        borderColor: 'grey.300'
                    }}
                >
                    <Typography variant="body2">
                        Have an account?{' '}
                        <MuiLink component={Link} to="/login" underline="none" fontWeight="bold">
                            Log in
                        </MuiLink>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Signup;
