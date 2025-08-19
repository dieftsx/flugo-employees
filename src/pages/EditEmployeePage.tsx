import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, CircularProgress, Box, Button, Typography } from '@mui/material';
import EmployeeForm from '../components/EmployeeForm'
import MainLayout from '../components/layout/MainLayout';
import { employeeService } from '../api/firebaseService';
import { Employee } from '../types/employeeTypes';

const EditEmployeePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployee = async () => {
      if (id) {
        try {
          const emp = await employeeService.getEmployeeById(id);
          // Corrige o tipo do campo gender para garantir compatibilidade
          const empCorrigido: Employee = {
            ...emp,
            gender: emp.gender === 'male' ? 'male' : 'female'
          };
          setEmployee(empCorrigido);
        } catch (err) {
          setError('Erro ao carregar colaborador');
          console.error('Erro ao buscar colaborador:', err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployee();
  }, [id]);

  if (loading) {
    return (
      <MainLayout>
        <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
          <CircularProgress size={60} sx={{ color: '#22C55E' }} />
          <Typography variant="body1" mt={2}>Carregando colaborador...</Typography>
        </Container>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h6" color="error">{error}</Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/employees')}
            sx={{ mt: 2, borderColor: '#22C55E', color: '#166534' }}
          >
            Voltar para a lista
          </Button>
        </Container>
      </MainLayout>
    );
  }

  if (!employee) {
    return (
      <MainLayout>
        <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
          <Typography variant="h6">Colaborador não encontrado</Typography>
          <Button 
            variant="outlined" 
            onClick={() => navigate('/employees')}
            sx={{ mt: 2, borderColor: '#22C55E', color: '#166534' }}
          >
            Voltar para a lista
          </Button>
        </Container>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Container maxWidth="md" sx={{ py: 2 }}>
        <EmployeeForm initialData={employee} isEditMode={true} />
      </Container>
    </MainLayout>
  );
};

export default EditEmployeePage;