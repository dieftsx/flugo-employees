import React from 'react';
import { Container, Box, Typography, Grid, Paper } from '@mui/material';
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
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper 
              component={Link} 
              to="/register" 
              elevation={3} 
              sx={{ 
                p: 4, 
                textAlign: 'center', 
                textDecoration: 'none', 
                display: 'block',
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
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper
              component={Link as React.ElementType}
              to="/employees"
              elevation={3}
              sx={{ 
                p: 4, 
                textAlign: 'center', 
                textDecoration: 'none', 
                display: 'block',
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
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DashboardPage;