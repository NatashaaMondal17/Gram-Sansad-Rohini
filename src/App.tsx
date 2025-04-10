import React from 'react';
import BirthCertificateForm from './forms/BirthCertificate/BirthCertificateForm';
import PaymentDetails from './forms/BirthCertificate/PaymentDetails';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ padding: '2rem' }}>
        <BirthCertificateForm />
      </div>
    </ThemeProvider>
  );
}

export default App;
