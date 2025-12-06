import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Table, TableBody, TableCell, 
  TableContainer, TableHead, TableRow, Paper, Button, 
  CircularProgress, Alert, IconButton, Box, Chip, 
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Select, MenuItem, InputLabel, FormControl, Grid, Link, Tooltip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import PhoneIcon from '@mui/icons-material/Phone';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const AdminDashboard = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const [editOpen, setEditOpen] = useState(false);
  const [currentRes, setCurrentRes] = useState(null);
  const [formData, setFormData] = useState({
    status: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    notes: ''
  });

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pl-PL');
  };

  const fetchReservations = async () => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/login'); return; }

    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };
      const { data } = await axios.get('/api/reservations', config);
      setReservations(data);
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 401) {
           localStorage.removeItem('adminToken');
           navigate('/login');
      }
      setError('Błąd pobierania danych.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [navigate]);

  const handleEditClick = (res) => {
    setDeleteConfirmId(null);
    
    setCurrentRes(res);
    setFormData({
      status: res.status,
      firstName: res.customer.firstName,
      lastName: res.customer.lastName,
      email: res.customer.email,
      phone: res.customer.phone,
      notes: res.notes || ''
    });
    setEditOpen(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateSubmit = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const config = { headers: { Authorization: `Bearer ${token}` } };
      
      const payload = {
        status: formData.status,
        notes: formData.notes,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        }
      };

      await axios.put(`/api/reservations/${currentRes._id}`, payload, config);
      
      setEditOpen(false);
      fetchReservations();
    } catch (err) {
      alert("Błąd aktualizacji: " + (err.response?.data?.message || err.message));
    }
  };

  const handleRequestDelete = (id) => {
    setDeleteConfirmId(id);
  };

  const handleCancelDelete = () => {
    setDeleteConfirmId(null);
  };

  const handleConfirmDelete = async (id) => {
    try {
      const token = localStorage.getItem('adminToken');
      await axios.delete(`/api/reservations/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      
      setReservations(reservations.filter((res) => res._id !== id));
      setDeleteConfirmId(null);
    } catch (err) {
      alert('Błąd usuwania.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/login');
  };

  const getStatusColor = (status) => {
    switch (status) {
        case 'confirmed': return 'success';
        case 'cancelled': return 'error';
        case 'completed': return 'info';
        default: return 'default';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
        case 'confirmed': return 'Potwierdzona';
        case 'cancelled': return 'Anulowana';
        case 'completed': return 'Zakończona';
        default: return status;
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={4}>
        <Typography variant="h4">Panel Zarządzania</Typography>
        <Button variant="outlined" color="secondary" startIcon={<LogoutIcon />} onClick={handleLogout}>
          Wyloguj
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TableContainer component={Paper} elevation={3}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell>Samochód</TableCell>
              <TableCell>Klient</TableCell>
              <TableCell>Termin</TableCell>
              <TableCell>Uwagi</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center" style={{ minWidth: 120 }}>Akcje</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reservations.map((res) => (
              <TableRow key={res._id} hover selected={deleteConfirmId === res._id}>
                <TableCell>
                  {res.car ? (
                      <>
                          <b>{res.car.brand} {res.car.model}</b><br/>
                          <small>{res.car.registrationNumber}</small>
                      </>
                  ) : <span style={{color:'red'}}>Pojazd usunięty</span>}
                </TableCell>
                
                <TableCell>
                  <Typography variant="body2" fontWeight="bold">
                    {res.customer.firstName} {res.customer.lastName}
                  </Typography>
                  <Link href={`mailto:${res.customer.email}`} underline="hover" sx={{ display: 'block', fontSize: '0.8rem', mb: 0.5 }}>
                    {res.customer.email}
                  </Link>
                  <Box display="flex" alignItems="center" gap={0.5} color="text.secondary">
                    <PhoneIcon sx={{ fontSize: 14 }} />
                    <Typography variant="caption" fontWeight="bold">
                        {res.customer.phone}
                    </Typography>
                  </Box>
                </TableCell>

                <TableCell>
                  {formatDate(res.startDate)} - {formatDate(res.endDate)}
                </TableCell>
                
                <TableCell sx={{ maxWidth: 200 }}>
                  {res.notes ? (
                    <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary', fontSize: '0.85rem' }}>
                      "{res.notes}"
                    </Typography>
                  ) : (
                    <Typography variant="caption" color="text.disabled">-</Typography>
                  )}
                </TableCell>

                <TableCell>
                  <Chip 
                      label={getStatusLabel(res.status)} 
                      color={getStatusColor(res.status)}
                      size="small" 
                      variant={res.status === 'completed' ? 'filled' : 'filled'}
                  />
                </TableCell>

                <TableCell align="center">
                  
                  {deleteConfirmId === res._id ? (
                    <Box display="flex" justifyContent="center">
                        <Tooltip title="Potwierdź usunięcie">
                            <IconButton 
                                color="error" 
                                onClick={() => handleConfirmDelete(res._id)}
                                size="small"
                                sx={{ border: '1px solid', borderColor: 'error.main', mr: 1 }}
                            >
                                <CheckIcon />
                            </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Anuluj">
                            <IconButton 
                                color="default" 
                                onClick={handleCancelDelete}
                                size="small"
                            >
                                <CloseIcon />
                            </IconButton>
                        </Tooltip>
                    </Box>
                  ) : (
                    <>
                        <Tooltip title="Edytuj">
                            <IconButton color="primary" onClick={() => handleEditClick(res)}>
                                <EditIcon />
                            </IconButton>
                        </Tooltip>
                        
                        <Tooltip title="Usuń">
                            <IconButton color="error" onClick={() => handleRequestDelete(res._id)}>
                                <DeleteIcon />
                            </IconButton>
                        </Tooltip>
                    </>
                  )}

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={editOpen} onClose={() => setEditOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Edytuj Rezerwację</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  name="status"
                  value={formData.status}
                  label="Status"
                  onChange={handleFormChange}
                >
                  <MenuItem value="confirmed">Potwierdzona</MenuItem>
                  <MenuItem value="cancelled">Anulowana</MenuItem>
                  <MenuItem value="completed">Zakończona</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Imię" name="firstName" value={formData.firstName} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={6}>
              <TextField fullWidth label="Nazwisko" name="lastName" value={formData.lastName} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Email" name="email" value={formData.email} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Telefon" name="phone" value={formData.phone} onChange={handleFormChange} />
            </Grid>
            <Grid item xs={12}>
               <TextField 
                fullWidth label="Notatki administratora" name="notes" multiline rows={3} 
                value={formData.notes} onChange={handleFormChange} 
               />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditOpen(false)} color="secondary">Anuluj</Button>
          <Button onClick={handleUpdateSubmit} variant="contained" color="primary">Zapisz Zmiany</Button>
        </DialogActions>
      </Dialog>

    </Container>
  );
};

export default AdminDashboard;