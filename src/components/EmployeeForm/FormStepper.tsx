import React from 'react';
import { Box, LinearProgress, Stepper, Step, StepLabel } from '@mui/material';

interface FormStepperProps {
  activeStep: number;
  steps: string[];
}

const FormStepper: React.FC<FormStepperProps> = ({ activeStep, steps }) => {
  const progressValue = (activeStep / (steps.length - 1)) * 100;

  return (
    <Box sx={{ mb: 4 }}>
      <LinearProgress 
        variant="determinate" 
        value={progressValue} 
        sx={{ height: 8, borderRadius: 4 }} 
      />
      
      <Stepper activeStep={activeStep} alternativeLabel sx={{ mt: 3 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
};

export default FormStepper;