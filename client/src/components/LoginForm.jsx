import React from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';

const LoginForm = () => {
  return (
    <Container maxWidth="xs">
      <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography component="h1" variant="h5">
          Zaloguj się
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            label="Adres Email"
            name="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Hasło"
            type="password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Zaloguj
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginForm;