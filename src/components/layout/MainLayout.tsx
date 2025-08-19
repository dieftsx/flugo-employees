import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import AppBar from './AppBar';
import { useAuth } from '../../context/AuthContext';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { currentUser } = useAuth();

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {currentUser && <Sidebar />}
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          width: '100%',
          backgroundColor: '#F0FDF4',
          minHeight: '100vh',
          transition: 'margin-left 0.3s',
        }}
      >
        <AppBar />
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;