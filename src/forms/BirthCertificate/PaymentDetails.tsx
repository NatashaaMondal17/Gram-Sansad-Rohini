import React from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  Paper,
  Box,
} from '@mui/material';

const validationSchema = Yup.object().shape({
  qrCodeScanned: Yup.boolean().oneOf([true], 'QR code must be scanned'),
  paymentProof: Yup.mixed().required('Payment proof is required'),
  utrNumber: Yup.string()
    .required('UTR number is required')
    .matches(/^[0-9]{12}$/, 'UTR number must be 12 digits'),
});

interface PaymentDetailsProps {
  onSubmit: (values: any) => void;
  onBack: () => void;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({ onSubmit, onBack }) => {
  const initialValues = {
    qrCodeScanned: false,
    paymentProof: null,
    utrNumber: '',
  };

  const handleSubmit = (values: any) => {
    onSubmit(values);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: 'white' }}>
        <Typography variant="h4" component="h1" sx={{ color: '#ff8f00', fontWeight: 'bold', mb: 4, textAlign: 'center' }}>
          Payment Details
        </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form>
              <Grid container spacing={3}>
                {/* QR Code Section */}
                <Grid item xs={12}>
                  <Paper elevation={1} sx={{ p: 2, bgcolor: 'white', border: '1px solid #42a5f5', borderLeft: '4px solid #42a5f5' }}>
                    <Typography variant="h6" sx={{ color: '#42a5f5', mb: 2, fontWeight: 'bold' }}>
                      Scan QR Code
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                      <Box 
                        sx={{ 
                          width: 200, 
                          height: 200, 
                          bgcolor: 'white', 
                          display: 'flex', 
                          alignItems: 'center', 
                          justifyContent: 'center',
                          border: '1px dashed #42a5f5',
                          borderRadius: 1
                        }}
                      >
                        <Typography variant="body2" color="textSecondary">
                          QR Code Placeholder
                        </Typography>
                      </Box>
                      <Button
                        variant="contained"
                        sx={{
                          bgcolor: '#42a5f5',
                          color: 'white',
                          '&:hover': {
                            bgcolor: '#1976d2',
                          },
                        }}
                        onClick={() => setFieldValue('qrCodeScanned', true)}
                      >
                        Mark as Scanned
                      </Button>
                    </Box>
                  </Paper>
                </Grid>

                {/* Payment Proof Upload and UTR Number in same row */}
                <Grid item xs={12}>
                  <Grid container spacing={3}>
                    <Grid item xs={6}>
                      <Paper elevation={1} sx={{ p: 2, bgcolor: 'white', border: '1px solid #42a5f5', borderLeft: '4px solid #42a5f5', height: '100%' }}>
                        <Typography variant="h6" sx={{ color: '#42a5f5', mb: 2, fontWeight: 'bold' }}>
                          Payment Proof
                        </Typography>
                        <Box sx={{ 
                          border: '1px dashed #42a5f5', 
                          p: 2, 
                          borderRadius: 1, 
                          bgcolor: 'white',
                          textAlign: 'center',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          minHeight: '120px'
                        }}>
                          <input
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(event) => {
                              setFieldValue('paymentProof', event.currentTarget.files?.[0] || null);
                            }}
                            style={{ display: 'none' }}
                            id="payment-proof-upload"
                          />
                          <label htmlFor="payment-proof-upload">
                            <Button
                              variant="outlined"
                              component="span"
                              sx={{
                                borderColor: '#42a5f5',
                                color: '#42a5f5',
                                '&:hover': {
                                  borderColor: '#1976d2',
                                  bgcolor: 'rgba(66, 165, 245, 0.1)',
                                },
                              }}
                            >
                              Upload Payment Receipt
                            </Button>
                          </label>
                          <Typography variant="body2" sx={{ mt: 1, color: '#666' }}>
                            Supported formats: JPG, PNG, PDF
                          </Typography>
                        </Box>
                        {touched.paymentProof && errors.paymentProof && (
                          <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
                            {errors.paymentProof}
                          </Typography>
                        )}
                      </Paper>
                    </Grid>

                    <Grid item xs={6}>
                      <Paper elevation={1} sx={{ p: 2, bgcolor: 'white', border: '1px solid #42a5f5', borderLeft: '4px solid #42a5f5', height: '100%' }}>
                        <Typography variant="h6" sx={{ color: '#42a5f5', mb: 2, fontWeight: 'bold' }}>
                          UTR Number
                        </Typography>
                        <Box sx={{ 
                          display: 'flex', 
                          alignItems: 'center', 
                          height: 'calc(100% - 40px)'  // Subtract the height of the title
                        }}>
                          <Field
                            name="utrNumber"
                            as={TextField}
                            label="Enter 12-digit UTR Number"
                            fullWidth
                            required
                            error={touched.utrNumber && errors.utrNumber}
                            helperText={touched.utrNumber && errors.utrNumber}
                            sx={{
                              '& .MuiOutlinedInput-root': {
                                '&:hover fieldset': {
                                  borderColor: '#42a5f5',
                                },
                                '&.Mui-focused fieldset': {
                                  borderColor: '#42a5f5',
                                },
                              },
                            }}
                          />
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                </Grid>

                {/* Navigation Buttons */}
                <Grid item xs={12}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mt: 3,
                    px: 2
                  }}>
                    <Button
                      variant="outlined"
                      onClick={onBack}
                      sx={{
                        borderColor: '#42a5f5',
                        color: '#42a5f5',
                        minWidth: '120px',
                        '&:hover': {
                          borderColor: '#1976d2',
                          bgcolor: 'rgba(66, 165, 245, 0.1)',
                        },
                      }}
                    >
                      Back
                    </Button>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: '#ff8f00',
                        color: 'white',
                        minWidth: '120px',
                        '&:hover': {
                          bgcolor: '#e65100',
                        },
                      }}
                    >
                      Submit
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
};

export default PaymentDetails; 