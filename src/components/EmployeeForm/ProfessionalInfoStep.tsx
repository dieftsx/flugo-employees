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
    </Box>
  );
};

export default ProfessionalInfoStep;