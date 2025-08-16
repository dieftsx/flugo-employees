import React from 'react';
import { Button, ButtonProps } from '@mui/material';

interface CustomButtonProps extends ButtonProps {
  children: React.ReactNode;
}

const CustomButton: React.FC<CustomButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      variant="contained"
      color="primary"
      {...props}
      sx={{
        textTransform: 'none',
        fontWeight: 600,
        borderRadius: 8,
        padding: '8px 24px',
        ...props.sx,
      }}
    >
      {children}
    </Button>
  );
};

export default CustomButton;