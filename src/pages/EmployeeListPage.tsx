import React, { useEffect, useState } from 'react';
import { 
  Container, Box, Typography, Button, Paper, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, CircularProgress 
} from '@mui/material';
import { Link } from 'react-router-dom';
import { Employee } from '../types/employeeTypes';
import AppBar from '../components/layout/AppBar';
import { useAuth } from '../context/AuthContext';
import { employeeService } from '../api/firebaseService'

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
          // Corrige o tipo, adicionando a propriedade 'departament' se estiver faltando
          const employeesCorrigidos: Employee[] = employeesFromService.map((emp: any) => ({
            ...emp,
            departament: emp.departament ?? '', // valor padrão se não existir
          }));
          setEmployees(employeesCorrigidos);
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
    <Container maxWidth="lg">
      <AppBar />
      <Box sx={{ py: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" color="primary.main">
            Colaboradores
          </Typography>
          <Button 
            variant="contained" 
            component={Link} 
            to="/register"
            sx={{ py: 1.5, px: 3, fontWeight: 'bold' }}
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
            >
              Cadastrar Primeiro Colaborador
            </Button>
          </Paper>
        ) : (
          <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <TableContainer>
              <Table>
                <TableHead sx={{ bgcolor: 'primary.main' }}>
                  <TableRow>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Nome</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>E-mail</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Departamento</TableCell>
                    <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {employees.map((employee) => (
                    <TableRow key={employee.id} hover>
                      <TableCell>{employee.name}</TableCell>
                      <TableCell>{employee.email}</TableCell>
                      <TableCell>{employee.departament}</TableCell>
                      <TableCell>
                        <Box 
                          component="span" 
                          sx={{
                            bgcolor: employee.status === 'Ativo' ? 'success.main' : 'error.main',
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
      </Box>
    </Container>
  );
};

export default EmployeeListPage;