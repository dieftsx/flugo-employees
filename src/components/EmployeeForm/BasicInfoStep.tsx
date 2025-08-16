import React from 'react'
import { Box, TextField, Typography, Button } from '@mui/material'
import { FormStepProps } from '../../types/employeeTypes'

const BasicInfoStep: React.FC<FormStepProps> = ({ values, onChange, errors }) => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Informações Básicas
        </Typography>
        
        <TextField
          label="Nome Completo"
          name="name"
          value={values.name}
          onChange={(e) => onChange('name', e.target.value)}
          fullWidth
          margin="normal"
          required
          error={!!errors.name}
          helperText={errors.name}
        />
        
        <TextField
          label="E-mail"
          name="email"
          type="email"
          value={values.email}
          onChange={(e) => onChange('email', e.target.value)}
          fullWidth
          margin="normal"
          required
          placeholder="exemplo@flugo.com"
          error={!!errors.email}
          helperText={errors.email}
        />
      </Box>
    );
  };
  
  export default BasicInfoStep;