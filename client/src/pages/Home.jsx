import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Container, Grid, Typography, CircularProgress, Alert, Box, 
  TextField, MenuItem, InputAdornment 
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import SortIcon from '@mui/icons-material/Sort';
import CarCard from '../components/CarCard';

const Home = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('priceAsc');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const { data } = await axios.get('/api/cars');
        setCars(data);
        setLoading(false);
      } catch (err) {
        console.error('Błąd pobierania aut:', err);
        setError('Nie udało się pobrać listy samochodów.');
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const getProcessedCars = () => {
    let result = [...cars];

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(car => 
        car.brand.toLowerCase().includes(lowerTerm) || 
        car.model.toLowerCase().includes(lowerTerm)
      );
    }

    result.sort((a, b) => {
      switch (sortOrder) {
        case 'priceAsc':
          return a.pricePerDay - b.pricePerDay;
        case 'priceDesc':
          return b.pricePerDay - a.pricePerDay;
        case 'available':
          return (b.isActive === true) - (a.isActive === true);
        default:
          return 0;
      }
    });

    return result;
  };

  const displayedCars = getProcessedCars();

  if (loading) return <Box display="flex" justifyContent="center" mt={4}><CircularProgress /></Box>;
  if (error) return <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>;

  return (
    <Container sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ mb: 4, fontWeight: 'bold' }}>
        Nasza Flota
      </Typography>

      <Box sx={{ mb: 5, p: 2, bgcolor: '#f5f5f5', borderRadius: 2 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', md: 'row' },
            gap: 2,
            width: '100%' 
          }}
        >
          
          <Box sx={{ flex: { xs: '1 1 100%', md: '2 1 0' } }}> 
            <TextField
              fullWidth
              label="Szukaj samochodu (np. BMW, Yaris)"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'white' }}
            />
          </Box>

          <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 0' } }}>
            <TextField
              select
              fullWidth
              label="Sortuj według"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SortIcon color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{ bgcolor: 'white' }}
            >
              <MenuItem value="priceAsc">Cena: Rosnąco</MenuItem>
              <MenuItem value="priceDesc">Cena: Malejąco</MenuItem>
              <MenuItem value="available">Dostępność (Aktywne)</MenuItem>
            </TextField>
          </Box>

        </Box>
      </Box>

      <Grid 
        container 
        spacing={4} 
        justifyContent="center"
      >
        {displayedCars.length > 0 ? (
          displayedCars.map((car) => (
            <Grid item key={car._id} xs={12} sm={6} md={4}>
              <CarCard car={car} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Alert severity="warning">Nie znaleziono samochodów pasujących do kryteriów.</Alert>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default Home;