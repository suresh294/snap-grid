import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <Container maxWidth="sm" sx={{ mt: 8, textAlign: 'center' }}>
                    <Box sx={{ p: 4, bgcolor: '#fff0f0', borderRadius: 2, border: '1px solid #ffcccc' }}>
                        <Typography variant="h5" color="error" gutterBottom>
                            Something went wrong.
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            {this.state.error && this.state.error.toString()}
                        </Typography>
                        <details style={{ whiteSpace: 'pre-wrap', textAlign: 'left', marginBottom: '16px' }}>
                            {this.state.errorInfo && this.state.errorInfo.componentStack}
                        </details>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => window.location.reload()}
                        >
                            Refresh Page
                        </Button>
                    </Box>
                </Container>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
