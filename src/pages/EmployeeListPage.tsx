import React, { useEffect, useState } from 'react';
import { 
  Container, Box, Typography, Button, Paper, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, CircularProgress,
  Avatar // Importe o Avatar
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Employee } from '../types/employeeTypes';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { employeeService } from '../api/firebaseService';
import { generateRandomAvatar } from '../utils/avatarUtils'

const EmployeeListPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const employeesFromService = await employeeService.getEmployees(currentUser.uid);
          // Faz o mapeamento para garantir que todos os campos do tipo Employee estejam presentes
          const employees: Employee[] = employeesFromService.map((emp: any) => ({
            ...emp,
            gender: emp.gender ?? '', // ou defina um valor padrão apropriado
          }));
          setEmployees(employees);
        } catch (error) {
          console.error('Erro ao buscar colaboradores:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployees();
  }, [currentUser]);

  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,
          backgroundColor: '#DCFCE7',
          p: 3,
          borderRadius: 2
        }}>
          <Typography variant="h4" fontWeight="bold" color="#166534">
            Colaboradores
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            to="/register"
            sx={{ 
              py: 1.5, 
              px: 3, 
              fontWeight: 'bold',
              backgroundColor: '#22C55E',
              '&:hover': {
                backgroundColor: '#16A34A'
              }
            }}
          >
            Novo Colaborador
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress size={60} />
          </Box>
        ) : employees.length === 0 ? (
          <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" gutterBottom>
              Nenhum colaborador cadastrado
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Você ainda não cadastrou nenhum colaborador. Clique no botão abaixo para começar.
            </Typography>
            <Button 
              variant="contained" 
              component={Link} 
              to="/register"
              sx={{
                backgroundColor: '#22C55E',
                '&:hover': {
                  backgroundColor: '#16A34A'
                }
              }}
            >
              Cadastrar Primeiro Colaborador
            </Button>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: '#BDC3C7' }}>
                    <TableCell sx={{ color: '#212B36', fontWeight: 'bold', width: '70px' }}></TableCell>
                    <TableCell sx={{ color: '#212B36', fontWeight: 'bold'}}>Nome</TableCell>
                    <TableCell sx={{ color: '#212B36', fontWeight: 'bold' }}>E-mail</TableCell>
                    <TableCell sx={{ color: '#212B36', fontWeight: 'bold' }}>Departamento</TableCell>
                    <TableCell sx={{ color: '#212B36', fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} hover>
                      <TableCell>
                        <Avatar 
                          src={generateRandomAvatar(employee.gender, employee.name)} 
                          alt={employee.name}
                          sx={{ width: 48, height: 48, border: '2px solid #22C55E' }}
                        />
                      </TableCell>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.departament}</TableCell>
                      <TableCell>
                        <Box 
                          component="span" 
                          sx={{
                            bgcolor: employee.status === 'Ativo' ? '#22C55E' : '#EF4444',
                            color: 'white',
                            py: 0.5,
                            px: 2,
                            borderRadius: 4,
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}
                        >
                          {employee.status}
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
      </Container>
    </MainLayout>
  );
};

export default EmployeeListPage;