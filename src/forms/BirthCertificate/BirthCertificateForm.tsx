import React, { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Button,
  Grid,
  Typography,
  Container,
  MenuItem,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Paper,
  Box,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import PaymentDetails from './PaymentDetails';

const validationSchema = Yup.object().shape({
  financialYear: Yup.string().required('Financial Year is required'),
  childName: Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
    middleName: Yup.string()
      .required('Middle name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
    lastName: Yup.string()
      .required('Last name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
  }),
  dateOfBirth: Yup.date().required('Date of birth is required'),
  timeOfBirth: Yup.mixed().required('Time of birth is required'),
  fatherName: Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
    middleName: Yup.string()
      .required('Middle name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
    lastName: Yup.string()
      .required('Last name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
  }),
  motherName: Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
    middleName: Yup.string()
      .required('Middle name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
    lastName: Yup.string()
      .required('Last name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
  }),
  hospitalName: Yup.string().required('Hospital name/address is required'),
  applicantName: Yup.object().shape({
    firstName: Yup.string()
      .required('First name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
    middleName: Yup.string()
      .required('Middle name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
    lastName: Yup.string()
      .required('Last name is required')
      .matches(/^[A-Z][a-z]*$/, 'First letter should be capital and rest small'),
  }),
  mobileNo: Yup.string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be exactly 10 digits')
    .required('Mobile number is required'),
  copies: Yup.string().required('Number of copies is required'),
  paymentOption: Yup.string().required('Payment option is required'),
});

const currentYear = new Date().getFullYear();
const financialYears = Array.from({ length: 10 }, (_, i) => {
  const year = currentYear - i;
  return `${year}-${year + 1}`;
});

const commonTextFieldSx = {
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: '#42a5f5',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#42a5f5',
    },
  },
};

const BirthCertificateForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>(null);

  const initialValues = {
    financialYear: `${currentYear}-${currentYear + 1}`,
    childName: { firstName: '', middleName: '', lastName: '' },
    dateOfBirth: null,
    timeOfBirth: null,
    fatherName: { firstName: '', middleName: '', lastName: '' },
    motherName: { firstName: '', middleName: '', lastName: '' },
    hospitalName: '',
    applicantName: { firstName: '', middleName: '', lastName: '' },
    mobileNo: '',
    copies: '',
    paymentOption: 'UPI',
  };

  const handleNext = (values: any) => {
    setFormData(values);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleFinalSubmit = (paymentValues: any) => {
    console.log('Form Data:', formData);
    console.log('Payment Data:', paymentValues);
    // Handle the final submission here
  };

  if (step === 2) {
    return <PaymentDetails onSubmit={handleFinalSubmit} onBack={handleBack} />;
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>, setFieldValue: (field: string, value: any) => void, fieldName: string) => {
    const value = e.target.value;
    if (value) {
      // Capitalize first letter and make rest lowercase
      const formattedValue = value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
      setFieldValue(fieldName, formattedValue);
    } else {
      setFieldValue(fieldName, '');
    }
  };

  const NameFields = ({ prefix, errors, touched, showMobileNumber = false }: { prefix: string; errors: any; touched: any; showMobileNumber?: boolean }) => (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Field
          name={`${prefix}.firstName`}
          render={({ field, form }: any) => (
            <TextField
              {...field}
              label="First Name"
              fullWidth
              required
              size="small"
              error={touched?.[prefix]?.firstName && errors?.[prefix]?.firstName}
              helperText={touched?.[prefix]?.firstName && errors?.[prefix]?.firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                handleNameChange(e, form.setFieldValue, `${prefix}.firstName`)
              }
              sx={commonTextFieldSx}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          name={`${prefix}.middleName`}
          render={({ field, form }: any) => (
            <TextField
              {...field}
              label="Middle Name"
              fullWidth
              required
              size="small"
              error={touched?.[prefix]?.middleName && errors?.[prefix]?.middleName}
              helperText={touched?.[prefix]?.middleName && errors?.[prefix]?.middleName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                handleNameChange(e, form.setFieldValue, `${prefix}.middleName`)
              }
              sx={commonTextFieldSx}
            />
          )}
        />
      </Grid>
      <Grid item xs={6}>
        <Field
          name={`${prefix}.lastName`}
          render={({ field, form }: any) => (
            <TextField
              {...field}
              label="Last Name"
              fullWidth
              required
              size="small"
              error={touched?.[prefix]?.lastName && errors?.[prefix]?.lastName}
              helperText={touched?.[prefix]?.lastName && errors?.[prefix]?.lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                handleNameChange(e, form.setFieldValue, `${prefix}.lastName`)
              }
              sx={commonTextFieldSx}
            />
          )}
        />
      </Grid>
      {showMobileNumber && (
        <Grid item xs={6}>
          <Field
            name="mobileNo"
            as={TextField}
            label="Mobile Number"
            fullWidth
            required
            size="small"
            error={touched.mobileNo && errors.mobileNo}
            helperText={touched.mobileNo && errors.mobileNo}
            sx={commonTextFieldSx}
          />
        </Grid>
      )}
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 3, bgcolor: 'white' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
          <img src="/logo.png" alt="Government Logo" style={{ width: 80, height: 80, marginRight: 16 }} />
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              color: '#ff8f00', 
              fontWeight: 'bold', 
              textAlign: 'center', 
              width: '100%',
              textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
              letterSpacing: '0.5px'
            }}
          >
            BIRTH CERTIFICATE APPLICATION FORM
          </Typography>
        </Box>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleNext}
        >
          {({ values, setFieldValue, errors, touched }) => (
            <Form>
              <Grid container spacing={3}>
                {/* Basic Details - Full Row */}
                <Grid item xs={12}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      border: '1px solid #42a5f5', 
                      borderLeft: '4px solid #42a5f5',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#42a5f5', mb: 2, fontWeight: 'bold' }}>
                      Basic Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Field
                          name="financialYear"
                          as={TextField}
                          select
                          label="Financial Year"
                          fullWidth
                          required
                          size="small"
                          error={touched.financialYear && errors.financialYear}
                          helperText={touched.financialYear && errors.financialYear}
                          sx={commonTextFieldSx}
                        >
                          <MenuItem value="2023-24">2023-24</MenuItem>
                          <MenuItem value="2024-25">2024-25</MenuItem>
                        </Field>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Child's Details */}
                <Grid item xs={12}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      border: '1px solid #42a5f5', 
                      borderLeft: '4px solid #42a5f5',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#42a5f5', mb: 2, fontWeight: 'bold' }}>
                      Child's Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Field
                          name="childName.firstName"
                          render={({ field, form }: any) => (
                            <TextField
                              {...field}
                              label="First Name"
                              fullWidth
                              required
                              size="small"
                              error={touched?.childName?.firstName && errors?.childName?.firstName}
                              helperText={touched?.childName?.firstName && errors?.childName?.firstName}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleNameChange(e, form.setFieldValue, 'childName.firstName')
                              }
                              sx={commonTextFieldSx}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          name="childName.middleName"
                          render={({ field, form }: any) => (
                            <TextField
                              {...field}
                              label="Middle Name"
                              fullWidth
                              required
                              size="small"
                              error={touched?.childName?.middleName && errors?.childName?.middleName}
                              helperText={touched?.childName?.middleName && errors?.childName?.middleName}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleNameChange(e, form.setFieldValue, 'childName.middleName')
                              }
                              sx={commonTextFieldSx}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <Field
                          name="childName.lastName"
                          render={({ field, form }: any) => (
                            <TextField
                              {...field}
                              label="Last Name"
                              fullWidth
                              required
                              size="small"
                              error={touched?.childName?.lastName && errors?.childName?.lastName}
                              helperText={touched?.childName?.lastName && errors?.childName?.lastName}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => 
                                handleNameChange(e, form.setFieldValue, 'childName.lastName')
                              }
                              sx={commonTextFieldSx}
                            />
                          )}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DatePicker
                            label="Date of Birth"
                            onChange={(date) => setFieldValue('dateOfBirth', date)}
                            value={values.dateOfBirth}
                            slotProps={{
                              textField: {
                                required: true,
                                size: "small",
                                fullWidth: true,
                                error: touched.dateOfBirth && Boolean(errors.dateOfBirth),
                                helperText: touched.dateOfBirth && errors.dateOfBirth as string,
                                sx: commonTextFieldSx,
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                      <Grid item xs={6}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <TimePicker
                            label="Time of Birth"
                            onChange={(time) => setFieldValue('timeOfBirth', time)}
                            value={values.timeOfBirth}
                            slotProps={{
                              textField: {
                                required: true,
                                size: "small",
                                fullWidth: true,
                                error: touched.timeOfBirth && Boolean(errors.timeOfBirth),
                                helperText: touched.timeOfBirth && errors.timeOfBirth as string,
                                sx: commonTextFieldSx,
                              },
                            }}
                          />
                        </LocalizationProvider>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Parents' Details */}
                <Grid item xs={12}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      border: '1px solid #42a5f5', 
                      borderLeft: '4px solid #42a5f5',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#42a5f5', mb: 2, fontWeight: 'bold' }}>
                      Parents' Details
                    </Typography>
                    
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#42a5f5' }}>Father's Name</Typography>
                    <NameFields prefix="fatherName" errors={errors} touched={touched} />
                    
                    <Typography variant="subtitle1" sx={{ mb: 1, mt: 2, color: '#42a5f5' }}>Mother's Name</Typography>
                    <NameFields prefix="motherName" errors={errors} touched={touched} />
                  </Paper>
                </Grid>

                {/* Hospital Details */}
                <Grid item xs={12}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      border: '1px solid #42a5f5', 
                      borderLeft: '4px solid #42a5f5',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#42a5f5', mb: 2, fontWeight: 'bold' }}>
                      Hospital Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Field
                          name="hospitalName"
                          as={TextField}
                          label="Hospital Name/Address"
                          fullWidth
                          required
                          size="small"
                          error={touched.hospitalName && errors.hospitalName}
                          helperText={touched.hospitalName && errors.hospitalName}
                          sx={commonTextFieldSx}
                        />
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Applicant Details */}
                <Grid item xs={12}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      border: '1px solid #42a5f5', 
                      borderLeft: '4px solid #42a5f5',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#42a5f5', mb: 2, fontWeight: 'bold' }}>
                      Applicant Details
                    </Typography>
                    <Typography variant="subtitle1" sx={{ mb: 1, color: '#42a5f5' }}>Applicant's Name</Typography>
                    <NameFields prefix="applicantName" errors={errors} touched={touched} showMobileNumber={true} />
                  </Paper>
                </Grid>

                {/* Certificate Details */}
                <Grid item xs={12}>
                  <Paper 
                    elevation={1} 
                    sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      border: '1px solid #42a5f5', 
                      borderLeft: '4px solid #42a5f5',
                    }}
                  >
                    <Typography variant="h6" sx={{ color: '#42a5f5', mb: 2, fontWeight: 'bold' }}>
                      Certificate Details
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Field
                          name="copies"
                          as={TextField}
                          label="Number of Copies"
                          type="number"
                          fullWidth
                          required
                          size="small"
                          error={touched.copies && errors.copies}
                          helperText={touched.copies && errors.copies}
                          sx={commonTextFieldSx}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControl component="fieldset" fullWidth>
                          <FormLabel component="legend" sx={{ color: '#42a5f5', '&.Mui-focused': { color: '#42a5f5' } }}>Payment Option</FormLabel>
                          <Field name="paymentOption">
                            {({ field }: any) => (
                              <RadioGroup row {...field}>
                                <FormControlLabel 
                                  value="UPI" 
                                  control={<Radio sx={{ 
                                    color: '#42a5f5', 
                                    '&.Mui-checked': { color: '#42a5f5' },
                                    '&:hover': { backgroundColor: 'rgba(66, 165, 245, 0.04)' }
                                  }} />} 
                                  label="UPI" 
                                />
                                <FormControlLabel 
                                  value="NetBanking" 
                                  control={<Radio sx={{ 
                                    color: '#42a5f5', 
                                    '&.Mui-checked': { color: '#42a5f5' },
                                    '&:hover': { backgroundColor: 'rgba(66, 165, 245, 0.04)' }
                                  }} />} 
                                  label="Net Banking" 
                                />
                                <FormControlLabel 
                                  value="Card" 
                                  control={<Radio sx={{ 
                                    color: '#42a5f5', 
                                    '&.Mui-checked': { color: '#42a5f5' },
                                    '&:hover': { backgroundColor: 'rgba(66, 165, 245, 0.04)' }
                                  }} />} 
                                  label="Card" 
                                />
                              </RadioGroup>
                            )}
                          </Field>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Paper>
                </Grid>

                {/* Replace the submit button with Next button */}
                <Grid item xs={12}>
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                    <Button
                      type="submit"
                      variant="contained"
                      sx={{
                        bgcolor: '#ff8f00',
                        color: 'white',
                        '&:hover': {
                          bgcolor: '#e65100',
                        },
                      }}
                    >
                      Next
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

export default BirthCertificateForm; 