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
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const result = await login(formData.email, formData.password);

        if (result.success) {
            navigate(from, { replace: true });
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
                    <CameraAltIcon sx={{ fontSize: 48, mb: 2 }} />
                    <Typography component="h1" variant="h5" sx={{ fontFamily: 'Grand Hotel, cursive', mb: 3 }}>
                        SnapGrid
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
                            autoFocus
                            value={formData.email}
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
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            size="small"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Log In
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
                        Don't have an account?{' '}
                        <MuiLink component={Link} to="/signup" underline="none" fontWeight="bold">
                            Sign up
                        </MuiLink>
                    </Typography>
                </Paper>
            </Box>
        </Container>
    );
};

export default Login;
