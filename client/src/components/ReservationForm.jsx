import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  TextField, Button, Grid, Typography, Alert, Box, 
  CircularProgress, Paper, InputAdornment 
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import NoteIcon from '@mui/icons-material/Note';

const ReservationForm = ({ car, initialDates, onSuccess, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: '',
    startDate: '',
    endDate: ''
  });

  const [errors, setErrors] = useState({});

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [totalCost, setTotalCost] = useState(0);
  const [daysCount, setDaysCount] = useState(0);

  useEffect(() => {
    if (initialDates) {
      setFormData(prev => ({
        ...prev,
        startDate: initialDates.start,
        endDate: initialDates.end 
      }));
    }
  }, [initialDates]);

  useEffect(() => {
    if (formData.startDate && formData.endDate && car) {
      const start = new Date(formData.startDate);
      const end = new Date(formData.endDate);
      const timeDiff = end.getTime() - start.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
      
      setDaysCount(daysDiff > 0 ? daysDiff : 0);
      setTotalCost(daysDiff > 0 ? daysDiff * car.pricePerDay : 0);
    }
  }, [formData.startDate, formData.endDate, car]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const validate = () => {
    let tempErrors = {};
    let isValid = true;

    if (!formData.firstName || formData.firstName.length < 2) {
      tempErrors.firstName = "Imię jest zbyt krótkie.";
      isValid = false;
    }

    if (!formData.lastName || formData.lastName.length < 2) {
      tempErrors.lastName = "Nazwisko jest zbyt krótkie.";
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      tempErrors.email = "Wprowadź poprawny adres email.";
      isValid = false;
    }

    const phoneRegex = /^\+?[0-9\s-]{9,15}$/;
    if (!formData.phone || !phoneRegex.test(formData.phone)) {
      tempErrors.phone = "Niepoprawny numer (tylko cyfry, 9-15 znaków).";
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) {
      return; 
    }

    setLoading(true);
    setMessage(null);

    try {
      await axios.post('/api/reservations', {
        car: car._id,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        startDate: formData.startDate,
        endDate: formData.endDate,
        notes: formData.notes
      });

      setMessage({ type: 'success', text: 'Rezerwacja udana! Sprawdź email.' });
      if(onSuccess) setTimeout(onSuccess, 2000);

    } catch (error) {
      const errorMsg = error.response?.data?.message || 'Błąd rezerwacji.';
      setMessage({ type: 'error', text: errorMsg });
      setLoading(false);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      
      <Paper elevation={0} sx={{ p: 2, mb: 3, backgroundColor: '#f5f9ff', borderRadius: 2, border: '1px solid #e0e0e0' }}>
        <Grid container alignItems="center" spacing={2}>
            <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                    <CalendarTodayIcon color="primary" />
                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">Termin:</Typography>
                        <Typography variant="body2" fontWeight="bold">
                            {formData.startDate} — {formData.endDate}
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Box display="flex" alignItems="center" gap={1}>
                    <AttachMoneyIcon color="success" />
                    <Box>
                        <Typography variant="caption" color="text.secondary" display="block">Do zapłaty ({daysCount} dni):</Typography>
                        <Typography variant="h6" color="primary.main" fontWeight="bold">
                            {totalCost} PLN
                        </Typography>
                    </Box>
                </Box>
            </Grid>
        </Grid>
      </Paper>

      {message && <Alert severity={message.type} sx={{ mb: 3 }}>{message.text}</Alert>}

      <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary', textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: 'bold' }}>
        Dane Klienta
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField 
            required fullWidth label="Imię" name="firstName" 
            value={formData.firstName} onChange={handleChange}
            error={!!errors.firstName} 
            helperText={errors.firstName}
            InputProps={{
              startAdornment: <InputAdornment position="start"><PersonIcon color={errors.firstName ? "error" : "action"} /></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            required fullWidth label="Nazwisko" name="lastName" 
            value={formData.lastName} onChange={handleChange} 
            error={!!errors.lastName}
            helperText={errors.lastName}
            InputProps={{
              startAdornment: <InputAdornment position="start"><PersonIcon color={errors.lastName ? "error" : "action"} /></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            required fullWidth type="email" label="Email" name="email" 
            value={formData.email} onChange={handleChange} 
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              startAdornment: <InputAdornment position="start"><EmailIcon color={errors.email ? "error" : "action"} /></InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            required fullWidth label="Telefon" name="phone" 
            value={formData.phone} onChange={handleChange} 
            error={!!errors.phone}
            helperText={errors.phone}
            InputProps={{
              startAdornment: <InputAdornment position="start"><PhoneIcon color={errors.phone ? "error" : "action"} /></InputAdornment>,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField 
            fullWidth 
            label="Dodatkowe uwagi (opcjonalne)" 
            name="notes" 
            multiline 
            rows={3} 
            value={formData.notes} 
            onChange={handleChange} 
            placeholder="Napisz tutaj, jeśli potrzebujesz faktury lub masz inne prośby."
            InputProps={{
              startAdornment: <InputAdornment position="start" sx={{alignSelf: 'flex-start', mt: 1.5}}><NoteIcon color="action" /></InputAdornment>,
            }}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', pt: 2, borderTop: '1px solid #eee' }}>
        <Button onClick={onCancel} sx={{ px: 4, color: 'text.secondary' }}>
            Wróć do kalendarza
        </Button>
        <Button 
            type="submit" 
            variant="contained" 
            size="large"
            disabled={loading}
            sx={{ px: 4, fontWeight: 'bold', borderRadius: 2 }}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Potwierdź i Rezerwuj'}
        </Button>
      </Box>
    </Box>
  );
};

export default ReservationForm;