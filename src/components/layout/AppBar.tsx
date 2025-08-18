import React from 'react';
import { 
  AppBar as MuiAppBar, 
  Toolbar, 
  Typography, 
  Box, 
  Button, 
  Avatar,
  Menu,
  MenuItem,
  IconButton
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Logout } from '@mui/icons-material';

const AppBar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  return (
    <MuiAppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={Link} 
          to="/"
          sx={{ 
            flexGrow: 1, 
            color: 'primary.main',
            textDecoration: 'none',
            fontWeight: 'bold'
          }}
        >
          Flugo
        </Typography>
        
        {currentUser ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Typography 
                component={Link} 
                to="/register"
                sx={{ 
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Cadastrar Colaborador
              </Typography>
              
              <Typography 
                component={Link} 
                to="/employees"
                sx={{ 
                  color: 'text.secondary',
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Lista de Colaboradores
              </Typography>
            </Box>

            <IconButton
              size="large"
              edge="end"
              onClick={handleMenuOpen}
              sx={{ ml: 2 }}
            >
              <Avatar 
                src={currentUser.photoURL || undefined} 
                alt={currentUser.displayName || 'Usuário'} 
                sx={{ width: 40, height: 40 }}
              />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  mt: 1.5,
                  minWidth: 200,
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem disabled>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {currentUser.displayName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {currentUser.email}
                  </Typography>
                </Box>
              </MenuItem>
              <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
                <Logout sx={{ mr: 1 }} /> Sair
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button 
            variant="outlined" 
            component={Link} 
            to="/login"
            sx={{ ml: 2 }}
          >
            Entrar
          </Button>
        )}
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;