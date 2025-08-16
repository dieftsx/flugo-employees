import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Typography } from '@mui/material';

const AppBar: React.FC = () => {
  return (
    <MuiAppBar position="static" elevation={0} sx={{ bgcolor: 'background.paper' }}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
          Flugo
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Sistema de Gerenciamento de Colaboradores
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
};

export default AppBar;