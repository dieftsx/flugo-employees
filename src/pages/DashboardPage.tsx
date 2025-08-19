import React from 'react';
import { Container, Box, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout';

const DashboardPage: React.FC = () => {
  return (
    <MainLayout>
      <Container maxWidth="lg" sx={{ mt: 2 }}>

        
        <Box sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4,
          justifyContent: 'center'
        }}>
          <Box sx={{ flex: '1 1 300px', maxWidth: 400 }}>
            <Paper 
              component={Link} 
              to="/employees" 
              sx={{ 
                p: 4, 
                textAlign: 'center', 
                textDecoration: 'none', 
                display: 'block',
                backgroundColor: 'white',

              }}
            >
              <Box sx={{ 
                bgcolor: '#DCFCE7', 
                width: 70, 
                height: 70, 
                borderRadius: '50%', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Box 
                  component="span" 
                  sx={{ 
                    fontSize: 30,
                    color: '#22C55E',
                    fontWeight: 'bold'
                  }}
                >
                  👥
                </Box>
              </Box>
              <Typography variant="h5" color="#BDC3C7" fontWeight="bold" gutterBottom>
                Lista de Colaboradores
              </Typography>
              <Typography color="text.secondary">
                Veja e gerencie todos os colaboradores
              </Typography>
            </Paper>
          </Box>
          
          <Box sx={{ flex: '1 1 300px', maxWidth: 400 }}>
            <Paper 
              component={Link} 
              to="/register" 
              sx={{ 
                p: 4, 
                textAlign: 'center', 
                textDecoration: 'none', 
                display: 'block',
                backgroundColor: 'white',

              }}
            >
              <Box sx={{ 
                bgcolor: '#DCFCE7', 
                width: 70, 
                height: 70, 
                borderRadius: '50%', 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                mx: 'auto',
                mb: 2
              }}>
                <Box 
                  component="span" 
                  sx={{ 
                    fontSize: 30,
                    color: '#22C55E',
                    fontWeight: 'bold'
                  }}
                >
                  +
                </Box>
              </Box>
              <Typography variant="h5" color="#166534" fontWeight="bold" gutterBottom>
                Cadastrar Colaborador
              </Typography>
              <Typography color="text.secondary">
                Adicione um novo colaborador ao sistema
              </Typography>
            </Paper>
          </Box>
        </Box>
      </Container>
    </MainLayout>
  );
};

export default DashboardPage;