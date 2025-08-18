import React from 'react';
import { 
  Container, 
  Box, 
  Typography, 
  Paper,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import AppBar from '../components/layout/AppBar';

const DashboardPage: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <AppBar />
      <Box sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" color="primary.main" gutterBottom>
          Dashboard
        </Typography>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
          <Paper 
            component={Link}
            to="/register" 
            sx={{ 
              p: 4, 
              textAlign: 'center', 
              textDecoration: 'none', 
              display: 'block',
              flex: '1 1 300px',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            <Typography variant="h5" color="primary" gutterBottom>
              Cadastrar Colaborador
            </Typography>
            <Typography color="text.secondary">
              Adicione um novo colaborador ao sistema
            </Typography>
          </Paper>
          
          <Paper 
            component={Link}
            to="/employees" 
            sx={{ 
              p: 4, 
              textAlign: 'center', 
              textDecoration: 'none', 
              display: 'block',
              flex: '1 1 300px',
              '&:hover': {
                boxShadow: 6,
                transform: 'translateY(-4px)',
                transition: 'all 0.3s ease'
              }
            }}
          >
            <Typography variant="h5" color="primary" gutterBottom>
              Lista de Colaboradores
            </Typography>
            <Typography color="text.secondary">
              Veja e gerencie todos os colaboradores
            </Typography>
          </Paper>
        </Box>
      </Box>
    </Container>
  );
};

export default DashboardPage;