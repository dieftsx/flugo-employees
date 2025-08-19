import React, { useState } from 'react';
import { 
  Box, 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider,
  Typography,
  useTheme,
  Collapse,
  Avatar,
  IconButton
} from '@mui/material';
import { 
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  PersonAdd as PersonAddIcon,
  Settings as SettingsIcon,
  ExpandLess,
  ExpandMore,
  Menu as MenuIcon,
  ChevronLeft,
  ChevronRight
} from '@mui/icons-material';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const { currentUser } = useAuth();
  const location = useLocation();
  const [open, setOpen] = useState(true);
  const [employeesOpen, setEmployeesOpen] = useState(true);

  const menuItems = [
    {
      text: 'Dashboard',
      icon: <DashboardIcon />,
      path: '/'
    },
    {
      text: 'Colaboradores',
      icon: <PeopleIcon />,
      path: '/employees',
      subItems: [
        { text: 'Lista de Colaboradores', path: '/employees' },
        { text: 'Cadastrar Colaborador', path: '/register' }
      ]
    },
    {
      text: 'Configurações',
      icon: <SettingsIcon />,
      path: '/settings'
    }
  ];

  const toggleSidebar = () => {
    setOpen(!open);
  };

  const toggleEmployees = () => {
    setEmployeesOpen(!employeesOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Drawer
        variant="permanent"
        sx={{
          width: open ? 240 : 60,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: open ? 240 : 60,
            boxSizing: 'border-box',
            color: '#637381',
            transition: theme.transitions.create('width', {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.enteringScreen,
            }),
            overflowX: 'hidden',
          },
        }}
      >
        <Box 
          sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: open ? 'space-between' : 'center',
            p: 2,
            height: 64
          }}
        >
          {open && (
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              <Box 
              component="img" 
              src="/flugo_logo.png" 
              alt="Flugo Logo" 
              sx={{ 
                width: 75, 
                height: 28,
              }} 
            />
            </Typography>
          )}
          <IconButton onClick={toggleSidebar} sx={{ color: '#637381' }}>
            {open ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Box>
        
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)' }} />
        
        <List>
          {menuItems.map((item) => (
            <React.Fragment key={item.text}>
              {!item.subItems ? (
                <ListItem disablePadding>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                     
                
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', color: '#637381' }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ fontWeight: isActive(item.path) ? 'bold' : 'normal' }}
                      sx={{ opacity: open ? 1 : 0 }} 
                    />
                  </ListItemButton>
                </ListItem>
              ) : (
                <>
                  <ListItemButton
                    onClick={toggleEmployees}
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? 'initial' : 'center',
                      px: 2.5,
                    
               
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', color: 'white' }}>
                      <PeopleIcon />
                    </ListItemIcon>
                    <ListItemText 
                      primary="Colaboradores" 
                      primaryTypographyProps={{ fontWeight: 'normal' }}
                      sx={{ opacity: open ? 1 : 0 }} 
                    />
                    {open && (employeesOpen ? <ExpandLess /> : <ExpandMore />)}
                  </ListItemButton>
                  
                  <Collapse in={open && employeesOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItemButton
                          key={subItem.text}
                          component={Link}
                          to={subItem.path}
                          sx={{
                            pl: 8,
                            minHeight: 48,
                          
                          }}
                        >
                          <ListItemIcon sx={{ minWidth: 0, mr: 3, color: 'white' }}>
                            {subItem.path === '/register' ? <PersonAddIcon /> : <PeopleIcon />}
                          </ListItemIcon>
                          <ListItemText 
                            primary={subItem.text} 
                            primaryTypographyProps={{ 
                              fontWeight: isActive(subItem.path) ? 'bold' : 'normal',
                              fontSize: '0.9rem'
                            }}
                          />
                        </ListItemButton>
                      ))}
                    </List>
                  </Collapse>
                </>
              )}
            </React.Fragment>
          ))}
        </List>
        
        <Box sx={{ mt: 'auto', p: 2 }}>
          <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.3)', mb: 2 }} />
          {currentUser && open && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Avatar 
                src={currentUser.photoURL || undefined} 
                alt={currentUser.displayName || 'Usuário'} 
                sx={{ width: 40, height: 40, mr: 2 }}
              />
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {currentUser.displayName || 'Usuário'}
                </Typography>
                <Typography variant="caption">
                  {currentUser.email}
                </Typography>
              </Box>
            </Box>
          )}
        </Box>
      </Drawer>
    </Box>
  );
};

export default Sidebar;