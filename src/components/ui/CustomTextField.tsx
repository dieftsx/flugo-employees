import React from 'react';
import { TextField, TextFieldProps } from '@mui/material';

const CustomTextField: React.FC<TextFieldProps> = (props) => {
  return (
    <TextField
      variant="outlined"
      fullWidth
      margin="normal"
      InputLabelProps={{
        shrink: true,
      }}
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
    />
  );
};

export default CustomTextField;