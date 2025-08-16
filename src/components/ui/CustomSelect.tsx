import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, SelectProps } from '@mui/material';

interface CustomSelectProps extends SelectProps {
  label: string;
  options: Array<{ value: string; label: string }>;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ label, options, ...props }) => {
  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        {...props}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            '& fieldset': {
              borderColor: '#e0e0e0',
            },
            '&:hover fieldset': {
              borderColor: '#1a237e',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#1a237e',
              borderWidth: '1px',
            },
          },
          ...props.sx,
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default CustomSelect;