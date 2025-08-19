import React from 'react';
import { 
  Dialog, DialogTitle, DialogContent, DialogActions, 
  Button, List, ListItem, ListItemText, Typography, Box
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Employee } from '../../types/employeeTypes';

interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  employee: Employee | null;
  isEditMode?: boolean
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose, employee, isEditMode = false }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: '#22C55E', 
        color: 'white',
        textAlign: 'center',
        py: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CheckCircleIcon sx={{ fontSize: 40, mr: 2 }} />
        <Typography variant="h5" component="div">
          {isEditMode ? 'Edição realizada com sucesso!' : 'Cadastro realizado com sucesso!'}
        </Typography>
      </DialogTitle>
      
      <DialogContent sx={{ py: 4, bgcolor: '#F0FDF4' }}>
        <Typography variant="body1" paragraph textAlign="center">
          {isEditMode 
            ? 'Os dados do colaborador foram atualizados:' 
            : 'O novo colaborador foi cadastrado no sistema:'}
        </Typography>
        
        {employee && (
          <List sx={{ 
            border: '1px solid #D1FAE5', 
            borderRadius: 2, 
            mt: 2,
            bgcolor: 'white'
          }}>
            <ListItem sx={{ borderBottom: '1px solid #ECFDF5' }}>
              <ListItemText 
                primary="Nome" 
                primaryTypographyProps={{ fontWeight: 'bold', color: '#166534' }}
                secondary={employee.name} 
              />
            </ListItem>
            <ListItem sx={{ borderBottom: '1px solid #ECFDF5' }}>
              <ListItemText 
                primary="E-mail" 
                primaryTypographyProps={{ fontWeight: 'bold', color: '#166534' }}
                secondary={employee.email} 
              />
            </ListItem>
            <ListItem sx={{ borderBottom: '1px solid #ECFDF5' }}>
              <ListItemText 
                primary="Departamento" 
                primaryTypographyProps={{ fontWeight: 'bold', color: '#166534' }}
                secondary={employee.departament} 
              />
            </ListItem>
            <ListItem>
              <ListItemText 
                primary="Status" 
                primaryTypographyProps={{ fontWeight: 'bold', color: '#166534' }}
                secondary={employee.status} 
              />
            </ListItem>
          </List>
        )}
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'center', py: 3, bgcolor: '#F0FDF4' }}>
        <Button
          variant="contained"
          onClick={onClose}
          sx={{ 
            width: 200, 
            py: 1.5,
            backgroundColor: '#22C55E',
            '&:hover': {
              backgroundColor: '#16A34A'
            }
          }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;