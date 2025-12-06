import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import CarRentalIcon from '@mui/icons-material/CarRental';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import LoginIcon from '@mui/icons-material/Login';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const isAdminLoggedIn = !!localStorage.getItem('adminToken');

  return (
    <AppBar position="static">
      <Toolbar>
        <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
          <CarRentalIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div">
            <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>
              Wypożyczalnia
            </Link>
          </Typography>
        </Box>

        <Button color="inherit" component={Link} to="/">
          Oferta Aut
        </Button>

        {isAdminLoggedIn ? (
          <Button 
            color="inherit" 
            component={Link} 
            to="/admin"
            startIcon={<AdminPanelSettingsIcon />}
            sx={{ 
              backgroundColor: 'rgba(255, 255, 255, 0.15)', 
              '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.25)' },
              ml: 1
            }}
          >
            Panel Admina
          </Button>
        ) : (
          <Button 
            color="inherit" 
            component={Link} 
            to="/login"
            startIcon={<LoginIcon />}
          >
            Zaloguj
          </Button>
        )}

      </Toolbar>
    </AppBar>
  );
};

export default Navbar;