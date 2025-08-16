import React, { useEffect, useState } from 'react';
import { Container, Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { Employee } from '../types/employeeTypes';
import AppBar from '../components/layout/AppBar';

// Mock data - substituir por chamada real ao Firebase
const mockEmployees: Employee[] = [
  {
    id: '1',
    name: 'Fernanda Torres',
    email: 'fernandatorres@flugo.com',
    department: 'Design',
    status: 'Ativo',
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Joana D\'Arc',
    email: 'joanadarc@flugo.com',
    department: 'TI',
    status: 'Ativo',
    createdAt: new Date(),
  },
  {
    id: '3',
    name: 'Mari Froes',
    email: 'marifroes@flugo.com',
    department: 'Marketing',
    status: 'Ativo',
    createdAt: new Date(),
  },
  {
    id: '4',
    name: 'Clera Costa',
    email: 'clerascosta@flugo.com',
    department: 'Produto',
    status: 'Inativo',
    createdAt: new Date(),
  },
];

const EmployeeListPage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    // Simular busca de dados
    setEmployees(mockEmployees);
  }, []);

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
                    <TableCell>{employee.department}</TableCell>
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
      </Box>
    </Container>
  );
};

export default EmployeeListPage;