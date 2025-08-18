import React from 'react';
import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SxProps,
  Theme
} from '@mui/material';
import { SelectProps } from '@mui/material';

interface CustomSelectProps extends Omit<SelectProps, 'label'> {
  label: string;
  options: Array<{ value: string; label: string }>;
  sx?: SxProps<Theme>;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ 
  label, 
  options, 
  sx,
  ...props 
}) => {
  return (
    <FormControl fullWidth margin="normal" sx={sx}>
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