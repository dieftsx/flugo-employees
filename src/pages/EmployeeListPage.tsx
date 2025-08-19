import React, { useEffect, useState } from 'react';
import { 
  Container, Box, Typography, Button, Paper, 
  Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, CircularProgress,
  Avatar, IconButton, Menu, MenuItem,
  DialogTitle,
  Dialog,
  DialogActions,
  DialogContent,
  
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Employee } from '../types/employeeTypes';
import MainLayout from '../components/layout/MainLayout';
import { useAuth } from '../context/AuthContext';
import { employeeService } from '../api/firebaseService';
import { generateRandomAvatar } from '../utils/avatarUtils';
import { Edit, Delete, MoreVert } from '@mui/icons-material';

const EmployeeListPage: React.FC = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      if (currentUser) {
        setLoading(true);
        try {
          const employeesFromService = await employeeService.getEmployees(currentUser.uid);
          // Corrige o tipo de gender para "male" | "female"
          const employees: Employee[] = employeesFromService.map(emp => ({
            ...emp,
            gender: emp.gender === 'male' || emp.gender === 'female' ? emp.gender : 'male'
          }));
          setEmployees(employees);
        } catch (error) {
          console.error('Erro ao buscar funcionários:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchEmployees();
  }, [currentUser]);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, employee: Employee) => {
    setAnchorEl(event.currentTarget);
    setSelectedEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedEmployee(null);
  };

  const handleEdit = () => {
    if (selectedEmployee) {
      navigate(`/edit-employee/${selectedEmployee.id}`);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteConfirm = async () => {
    if (selectedEmployee && selectedEmployee.id) {
      try {
        await employeeService.deleteEmployee(selectedEmployee.id);
        setEmployees(employees.filter(emp => emp.id !== selectedEmployee.id));
        setDeleteDialogOpen(false);
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <MainLayout>
      <Container maxWidth="lg">
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center', 
          mb: 4,

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
                    <TableCell sx={{ color: '#212B36', fontWeight: 'bold' }}>Nome</TableCell>
                    <TableCell sx={{ color: '#212B36', fontWeight: 'bold' }}>E-mail</TableCell>
                    <TableCell sx={{ color: '#212B36', fontWeight: 'bold' }}>Departamento</TableCell>
                    <TableCell sx={{ color: '#212B36', fontWeight: 'bold' }}>Status</TableCell>
                    <TableCell sx={{ color: '#212B36', fontWeight: 'bold', width: '50px' }}>Ações</TableCell>
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
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, employee)}
                        >
                          <MoreVert />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        )}
        
        {/* Menu de ações */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          PaperProps={{
            elevation: 3,
            sx: {
              minWidth: 150,
              boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
            }
          }}
        >
          <MenuItem onClick={handleEdit}>
            <Edit sx={{ mr: 1, color: '#166534' }} /> Editar
          </MenuItem>
          <MenuItem onClick={handleDeleteClick} sx={{ color: '#EF4444' }}>
            <Delete sx={{ mr: 1 }} /> Excluir
          </MenuItem>
        </Menu>
        
        {/* Diálogo de confirmação de exclusão */}
        <Dialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          PaperProps={{
            sx: {
              borderRadius: 3,
              border: '2px solid #EF4444',
              overflow: 'hidden'
            }
          }}
        >
          <DialogTitle 
            sx={{ 
              bgcolor: '#FEE2E2', 
              color: '#EF4444',
              fontWeight: 'bold'
            }}
          >
            Confirmar Exclusão
          </DialogTitle>
          <DialogContent sx={{ py: 3 }}>
            <Typography>
              Tem certeza que deseja excluir o colaborador <strong>{selectedEmployee?.name}</strong>?
            </Typography>
            <Typography variant="body2" color="text.secondary" mt={1}>
              Esta ação não pode ser desfeita.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ py: 2, px: 3 }}>
            <Button 
              onClick={() => setDeleteDialogOpen(false)}
              variant="outlined"
              sx={{ 
                borderColor: '#22C55E', 
                color: '#166534',
                '&:hover': {
                  backgroundColor: '#DCFCE7'
                }
              }}
            >
              Cancelar
            </Button>
            <Button 
              onClick={handleDeleteConfirm}
              variant="contained"
              sx={{ 
                backgroundColor: '#EF4444',
                '&:hover': {
                  backgroundColor: '#DC2626'
                }
              }}
            >
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </MainLayout>
  );
};

export default EmployeeListPage;