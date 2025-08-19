import React from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { FormStepProps } from '../../types/employeeTypes';
import { DEPARTAMENTS } from '../../utils/constants';

const ProfessionalInfoStep: React.FC<FormStepProps> = ({ values, onChange, errors }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Informações Profissionais
      </Typography>
      
      <FormControl fullWidth margin="normal" required error={!!errors.department}>
        <InputLabel id="department-label">Departamento</InputLabel>
        <Select
          labelId="department-label"
          id="department"
          name="departament"
          value={values.departament}
          onChange={(e) => onChange('departament', e.target.value)}
          label="Departamento"
        >
          {DEPARTAMENTS.map((dept: { value: string; label: string }) => (
            <MenuItem key={dept.value} value={dept.value}>
              {dept.label}
            </MenuItem>
          ))}
        </Select>
        {errors.department && (
          <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
            {errors.department}
          </Typography>
        )}
      </FormControl>

      <FormControl fullWidth margin="normal" required error={!!errors.gender}>
            <InputLabel id="gender-label">Gênero</InputLabel>
            <Select
              labelId="gender-label"
              id="gender"
              name="gender"
              value={values.gender || 'male'}
              onChange={(e) => onChange('gender', e.target.value)}
              label="Gênero"
            >
              <MenuItem value="male">Masculino</MenuItem>
              <MenuItem value="female">Feminino</MenuItem>
            </Select>
            {errors.gender && (
              <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
                Gênero é obrigatório
              </Typography>
            )}
          </FormControl>
    </Box>
    
  );
};

export default ProfessionalInfoStep;