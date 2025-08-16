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
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose, employee }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ 
        bgcolor: 'success.main', 
        color: 'white',
        textAlign: 'center',
        py: 3
      }}>
        <Box display="flex" alignItems="center" justifyContent="center">
          <CheckCircleIcon sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h5" component="div">
            Cadastro realizado com sucesso!
          </Typography>
        </Box>
      </DialogTitle>
      
      <DialogContent sx={{ py: 4 }}>
        <Typography variant="body1" paragraph>
          O novo colaborador foi cadastrado no sistema:
        </Typography>
        
        {employee && (
          <List sx={{ border: '1px solid #e0e0e0', borderRadius: 1, mt: 2 }}>
            <ListItem>
              <ListItemText primary="Nome" secondary={employee.name} />
            </ListItem>
            <ListItem>
              <ListItemText primary="E-mail" secondary={employee.email} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Departamento" secondary={employee.departament} />
            </ListItem>
            <ListItem>
              <ListItemText primary="Status" secondary="Ativo" />
            </ListItem>
          </List>
        )}
      </DialogContent>
      
      <DialogActions sx={{ justifyContent: 'center', py: 3 }}>
        <Button 
          variant="contained" 
          onClick={onClose}
          sx={{ width: 200, py: 1.5 }}
        >
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SuccessDialog;