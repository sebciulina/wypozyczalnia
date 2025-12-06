import React, { useState } from 'react';
import { 
  Card, CardContent, CardMedia, Typography, Button, CardActions, 
  Dialog, DialogContent, DialogTitle, IconButton, useTheme, useMediaQuery 
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ReservationForm from './ReservationForm';
import CarCalendar from './CarCalendar';

const CarCard = ({ car }) => {
  const [openModal, setOpenModal] = useState(false);
  const [view, setView] = useState('calendar'); 
  const [selectedDates, setSelectedDates] = useState(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleOpen = () => {
    setOpenModal(true);
    setView('calendar');
  };

  const handleClose = () => setOpenModal(false);

  const handleDateSelection = (dates) => {
    setSelectedDates(dates);
    setView('form');
  };

  return (
    <>
      <Card 
        sx={{ 
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          maxWidth: 300,
          width: '100%', 
          mx: 'auto',
          boxShadow: 3,
          transition: 'transform 0.2s',
          '&:hover': { transform: 'scale(1.02)', boxShadow: 6 }
        }}
      >
        <CardMedia
          component="img"
          height="220"
          image={car.imageUrl}
          alt={car.brand}
          sx={{ objectFit: 'cover', objectPosition: 'center' }}
        />
        
        <CardContent sx={{ flexGrow: 1 }}> 
          <Typography gutterBottom variant="h5" component="div" fontWeight="bold">
            {car.brand} {car.model}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Cena: <span style={{ color: '#1976d2', fontWeight: 'bold' }}>{car.pricePerDay} PLN</span> / dzień
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
             Rejestracja: {car.registrationNumber}
          </Typography>
        </CardContent>

        <CardActions sx={{ p: 2, pt: 0 }}>
          <Button 
            variant="contained" 
            fullWidth 
            onClick={handleOpen}
            sx={{ fontWeight: 'bold' }}
          >
            Sprawdź dostępność
          </Button>
        </CardActions>
      </Card>

      <Dialog 
        open={openModal} 
        onClose={handleClose} 
        maxWidth="md" 
        fullWidth
        fullScreen={isMobile}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: isMobile ? 1 : 2 }}>
          <Typography variant={isMobile ? "subtitle1" : "h6"}>
            {view === 'calendar' ? 
              (isMobile ? `Terminarz: ${car.model}` : `Wybierz termin: ${car.brand} ${car.model}`) 
              : 'Potwierdź dane'}
          </Typography>
          
          <IconButton onClick={handleClose} size={isMobile ? "small" : "medium"}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        
        <DialogContent dividers sx={{ p: isMobile ? 1 : 2 }}>
          {view === 'calendar' ? (
            <CarCalendar 
              carId={car._id} 
              onDateSelect={handleDateSelection} 
            />
          ) : (
            <ReservationForm 
              car={car}
              initialDates={selectedDates}
              onSuccess={handleClose}
              onCancel={() => setView('calendar')}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarCard;