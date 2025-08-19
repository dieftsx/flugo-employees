import React, { useState } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import BasicInfoStep from './BasicInfoStep';
import ProfessionalInfoStep from './ProfessionalInfoStep';
import FormStepper from './FormStepper';
import SuccessDialog from '../employees/SuccessDialog';
import { Employee } from '../../types/employeeTypes';
import { employeeService } from '../../api/firebaseService';
import { useAuth } from '../../context/AuthContext';
import { validateName, validateEmail, validateDepartament, validateGender } from '../../utils/validation';

const EmployeeForm: React.FC = () => {
  const { currentUser } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState<Employee>({
    name: '',
    email: '',
    departament: '',
    gender: 'male',
    status: 'Ativo'
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [newEmployee, setNewEmployee] = useState<Employee | null>(null);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const steps = ['Informações Básicas', 'Informações Profissionais'];

  const handleChange = (field: keyof Employee, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when field changes
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (step === 0) {
      newErrors.name = validateName(formData.name);
      newErrors.email = validateEmail(formData.email);
    } else if (step === 1) {
      newErrors.department = validateDepartament(formData.departament);
      newErrors.gender = validateGender(formData.gender)
    }
    
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error !== '');
  };

  const handleNext = () => {
    if (!validateStep(activeStep)) return;
    
    if (activeStep === steps.length - 1) {
      submitForm();
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const submitForm = async () => {
    setSubmissionError(null);
    
    if (!currentUser) {
      setSubmissionError("Usuário não autenticado");
      return;
    }

    try {
      // Garanta que todos os campos estão presentes
      const employeeData = {
        name: formData.name,
        email: formData.email,
        departament: formData.departament,
        status: formData.status
      };

      // Corrigindo o nome do campo para 'departament' conforme esperado pelo tipo Employee
      const employeeDataCorrigido = {
        name: formData.name,
        email: formData.email,
        departament: formData.departament,
        status: formData.status
      // Incluindo o campo 'gender' conforme exigido pelo tipo Employee
      };

      const employeeDataCompleto = {
        ...employeeDataCorrigido,
        gender: formData.gender
      };

      const id = await employeeService.addEmployee(employeeDataCompleto, currentUser.uid);
      setNewEmployee({ ...formData, id });
      setSuccess(true);
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmissionError("Erro ao salvar colaborador. Tente novamente.");
    }
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', departament: '', gender:'male', status: 'Ativo' });
    setActiveStep(0);
    setErrors({});
  };

  const getStepContent = () => {
    switch (activeStep) {
      case 0:
        return <BasicInfoStep 
                 values={formData} 
                 onChange={handleChange} 
                 errors={errors} 
               />;
      case 1:
        return <ProfessionalInfoStep 
                 values={formData} 
                 onChange={handleChange} 
                 errors={errors} 
               />;
      default:
        return null;
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: '#F0FDF9' }}>
      <Box sx={{ mb: 3 }}>
        <Typography 
          variant="h5" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            color: '#166534',
            borderBottom: '2px solid #22C55E',
            pb: 1,
            mb: 2
          }}
        >
          Flugo
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Colaboradores / Cadastrar Colaborador
        </Typography>
      </Box>
      
      <FormStepper 
        activeStep={activeStep} 
        steps={steps} 
      />
      
      <Box sx={{ my: 4 }}>
        {getStepContent()}
      </Box>
      
      {submissionError && (
        <Typography color="error" sx={{ mb: 2, textAlign: 'center' }}>
          {submissionError}
        </Typography>
      )}
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button 
          variant="outlined" 
          onClick={handleBack} 
          disabled={activeStep === 0}
          sx={{
            borderColor: '#22C55E',
            color: '#166534',
            '&:hover': {
              backgroundColor: '#DCFCE7',
              borderColor: '#16A34A'
            }
          }}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            backgroundColor: '#22C55E',
            '&:hover': {
              backgroundColor: '#16A34A'
            }
          }}
        >
          {activeStep === steps.length - 1 ? 'Salvar' : 'Próximo'}
        </Button>
      </Box>
      
      <SuccessDialog 
        open={success} 
        onClose={() => setSuccess(false)} 
        employee={newEmployee} 
      />
    </Paper>
  );
};

export default EmployeeForm;