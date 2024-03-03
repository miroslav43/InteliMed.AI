import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const defaultTheme = createTheme();

export default function SignUp() {
  const [isMedic, setIsMedic] = React.useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const formData = {
      firstName: event.target.elements.firstName.value,
      lastName: event.target.elements.lastName.value,
      email: event.target.elements.email.value,
      password: event.target.elements.password.value,
      medic: isMedic,
      university: event.target.elements.university ? event.target.elements.university.value : "", // Add a conditional check
    };
  
    console.log(formData); // Log form data
  
    sendSignUpData(formData);
  };
  

  const sendSignUpData = async (formData) => {
    try {
      const response = await fetch('http://localhost:8000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Redirect to login page after successful signup
        window.location.href = '/login';
      } else {
        console.error('Signup failed:', response.statusText);
        // Handle signup failure here
      }
    } catch (error) {
      console.error('Error during signup:', error);
      // Handle signup error here
    }
  };

  const StyledFileInput = ({ onChange, ...props }) => {
    return (
      <label htmlFor="fileInput">
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }} // Hide the actual file input
          onChange={onChange} // Forward the onChange event to the parent component
          {...props}
        />
        <Button variant="contained" component="span" sx={{ bgcolor: 'blue', color: 'white', '&:hover': { bgcolor: '#0044ff' } }}>
          Upload File
        </Button>
      </label>
    );
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'blue' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value={isMedic} name="medic" color="primary" onChange={(e) => setIsMedic(e.target.checked)} />}
                  label="I am a medic."
                />
              </Grid>
              {isMedic && (
                <>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      id="university"
                      name="university"
                      label="University"
                      autoComplete="university"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <StyledFileInput
                      name="file"
                      onChange={(e) => console.log(e.target.files[0])} // Handle file selection
                    />
                  </Grid>
                </>
              )}
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2, bgcolor: 'blue' }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
