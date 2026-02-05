import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="sticky" color="default" elevation={1} sx={{ bgcolor: 'white' }}>
            <Container maxWidth="md">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
                    <Box
                        component={Link}
                        to="/"
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            textDecoration: 'none',
                            color: 'black'
                        }}
                    >
                        <CameraAltIcon sx={{ mr: 1, fontSize: 30 }} />
                        <Typography
                            variant="h5"
                            component="div"
                            sx={{
                                fontFamily: 'Grand Hotel, cursive', // Fallback or imported font
                                fontWeight: 'bold',
                                letterSpacing: 1
                            }}
                        >
                            SnapGrid
                        </Typography>
                    </Box>

                    <Box>
                        {user ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Typography variant="body2" sx={{ display: { xs: 'none', sm: 'block' } }}>
                                    {user.username}
                                </Typography>
                                <Button
                                    color="inherit"
                                    onClick={handleLogout}
                                    size="small"
                                >
                                    Logout
                                </Button>
                            </Box>
                        ) : (
                            <Box>
                                <Button component={Link} to="/login" color="inherit">Login</Button>
                                <Button component={Link} to="/signup" color="primary" variant="contained" size="small" sx={{ ml: 1 }}>
                                    Signup
                                </Button>
                            </Box>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
