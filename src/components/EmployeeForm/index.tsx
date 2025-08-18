import React, { useState } from 'react';
import { Box, Button, Paper, Typography } from '@mui/material';
import BasicInfoStep from './BasicInfoStep';
import ProfessionalInfoStep from './ProfessionalInfoStep';
import FormStepper from '../EmployeeForm/FormStepper';
import SuccessDialog from '../employees/SuccessDialog';
import type { Employee } from '../../types/employeeTypes';
import { employeeService } from '../../api/firebaseService';
import { validateName, validateEmail, validateDepartament } from '../../utils/validation';

import { useAuth } from '../../context/AuthContext';

const EmployeeForm: React.FC = () => {
  const {currentUser} = useAuth()
  const [activeStep, setActiveStep] = useState(0)
  const [formData, setFormData] = useState<Employee>({
    name: '',
    email: '',
    departament: '',
    status: 'Ativo',    
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [success, setSuccess] = useState(false)
  const [newEmployee, setNewEmployee] = useState<Employee | null>(null)

  const steps = ['Informações Básicas', 'Informações Profissionais']

  const handleChange = (field: keyof Employee, value: string) => {
    setFormData(prev => ({...prev, [field]: value}))

    if(errors[field]) {
      setErrors(prev => ({...prev, [field]: ''}))
    }
  }

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    if(step === 0) {
      newErrors.name = validateName(formData.name)
      newErrors.email = validateEmail(formData.email)
    } else if(step === 1) {
      newErrors.departament = validateDepartament(formData.departament)
    }

    setErrors(newErrors)
    return !Object.values(newErrors).some(error => error !== '')
  }

  const handleNext = () => {
    if (!validateStep(activeStep)) return;

    if (activeStep === steps.length - 1) {
      submitForm();
    } else {
      setActiveStep(prev => prev + 1)
    }
  }

  const handleBack = () => {
    setActiveStep(prev => prev - 1)
  }

  const submitForm = async () => {
    try {
      const id = await employeeService.addEmployee(formData, currentUser.uid)
      setNewEmployee({...formData, id})
      setSuccess(true);
      resetForm();
    } catch (error) {
      console.error('Error Submitting Form:', error)
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      departament: '',
      status: 'Ativo',
    })
    setErrors({})
    setActiveStep(0)
  }

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
    <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant='h5' component='div' sx={{ fontWeight: 'bold' }}>
          Flugo
        </Typography>
        <Typography variant='subtitle1' color='text.secondary'>
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Voltar
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
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
  )

}
export default EmployeeForm
