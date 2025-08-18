import { GlobalStyles as MuiGlobalStyles } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const GlobalStylesComponent = () => {
  const theme = useTheme();
  
  return (
    <MuiGlobalStyles styles={{
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
      a: {
        textDecoration: 'none',
        color: 'inherit',
      },
      '.MuiTable-root': {
        borderCollapse: 'separate',
        borderSpacing: '0 8px',
      },
      '.MuiTableCell-root': {
        borderBottom: 'none',
      },
    }} />
  );
};

export default GlobalStylesComponent;