import React, { useState, useEffect } from 'react';
import axios from 'axios';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Box, CircularProgress, Alert, useMediaQuery, useTheme } from '@mui/material';
import plLocale from '@fullcalendar/core/locales/pl';

const CarCalendar = ({ carId, onDateSelect }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const { data } = await axios.get(`/api/reservations?carId=${carId}`);
        
        const calendarEvents = data.map(res => ({
          title: isMobile ? '' : 'Zarezerwowane',
          
          start: res.startDate,
          end: res.endDate,
          display: 'background', 
          backgroundColor: '#d32f2f', 
          allDay: true
        }));

        setEvents(calendarEvents);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    if (carId) fetchReservations();
    
  }, [carId, isMobile]);

  const handleSelect = (info) => {
    const today = new Date();
    today.setHours(0,0,0,0);
    if (info.start < today) {
      alert("Nie można rezerwować dat w przeszłości!");
      return;
    }
    
    onDateSelect({
      start: info.startStr,
      end: info.endStr
    });
  };

  if (loading) return <CircularProgress />;

  return (
    <Box sx={{
      '& .fc-toolbar-title': { fontSize: isMobile ? '1.2rem' : '1.75em' },
      '& .fc-button': { padding: isMobile ? '0.2em 0.4em' : '0.4em 0.65em', fontSize: isMobile ? '0.8em' : '1em' }
    }}>
      <Alert severity="info" sx={{ mb: 2, fontSize: isMobile ? '0.8rem' : '1rem' }}>
        {isMobile ? "Dotknij i przytrzymaj, aby zaznaczyć daty." : "Zaznacz myszką dostępne dni (białe pola)."}
      </Alert>
      
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        locale={plLocale}
        
        headerToolbar={
          isMobile ? {
            left: 'prev,next',
            center: 'title',
            right: '' 
          } : {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek'
          }
        }
        
        selectable={true}      
        selectMirror={true}
        selectOverlap={false}  
        events={events}        
        select={handleSelect}
        
        height={isMobile ? "auto" : "500px"} 
        contentHeight={isMobile ? "auto" : undefined}
        aspectRatio={isMobile ? 0.8 : 1.35}
      />
    </Box>
  );
};

export default CarCalendar;