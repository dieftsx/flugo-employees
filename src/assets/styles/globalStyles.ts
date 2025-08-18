import { GlobalStyles as MuiGlobalStyles } from '@mui/material';

const GlobalStyles = () => (
  <MuiGlobalStyles
    styles={{
      body: {
        backgroundColor: '#f5f7fa',
        margin: 0,
        padding: 0,
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
    }}
  />
);

export default GlobalStyles;