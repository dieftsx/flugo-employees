import React, { useEffect } from 'react';
import { Container, Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AppBar from '../components/layout/AppBar';

const LoginPage: React.FC = () => {
  const { loginWithGoogle, loading, currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/');
    }
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <AppBar />
      <Box sx={{ mt: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', textAlign: 'center' }}>
          <Typography variant="h5" component="h1" gutterBottom>
            Acesso ao Sistema
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Faça login com sua conta Google para acessar o sistema de colaboradores da Flugo.
          </Typography>
          
          {loading ? (
            <CircularProgress size={24} />
          ) : (
            <Button 
              variant="contained" 
              onClick={handleLogin}
              sx={{ py: 1.5, px: 4, fontSize: '1rem' }}
              startIcon={
                <Box 
                  component="img" 
                  src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" 
                  alt="Google" 
                  sx={{ width: 24, height: 24 }}
                />
              }
            >
              Entrar com Google
            </Button>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default LoginPage;