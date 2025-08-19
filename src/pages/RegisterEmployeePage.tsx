import React from 'react';
import { Container } from '@mui/material';
import EmployeeForm from '../components/EmployeeForm';
import MainLayout from '../components/layout/MainLayout';

const RegisterEmployeePage: React.FC = () => {
  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 2 }}>
        <EmployeeForm />
      </Container>
    </MainLayout>
  );
};

export default RegisterEmployeePage;