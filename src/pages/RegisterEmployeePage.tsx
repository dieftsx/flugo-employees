import React, { useEffect } from 'react';
import { Container, CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import EmployeeForm from '../components/EmployeeForm';
import AppBar from '../components/layout/AppBar';
import theme from '../assets/styles/theme';

const RegisterEmployeePage: React.FC = () => {
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar />
      <Container maxWidth="md" sx={{ py: 6 }}>
        <EmployeeForm />
      </Container>
    </ThemeProvider>
  );
};

export default RegisterEmployeePage;