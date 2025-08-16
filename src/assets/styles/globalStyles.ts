import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={{
      body: {
        backgroundColor: '#f5f7fa',
        margin: 0,
        padding: 0,
        fontFamily: '"Inter", sans-serif',
      },
      '#root': {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      },
    }}
  />
);

export default GlobalStyles;