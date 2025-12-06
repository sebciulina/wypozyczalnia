import React from 'react';
import { Box, Container, Grid, Typography, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1a1a',
        color: 'white',
        py: 3,
        mt: 'auto',
        borderTop: '1px solid #333'
      }}
    >
      <Container maxWidth="xl">

        <Grid container spacing={4} justifyContent="space-between">

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="inherit" gutterBottom sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
              Wypożyczalnia Aut
            </Typography>
            <Typography variant="body2" color="grey.500" sx={{ maxWidth: 300 }}>
              Oferujemy najlepsze samochody w najniższych cenach. 
              Bezpieczeństwo i komfort to nasz priorytet.
            </Typography>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="inherit" gutterBottom sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
              Szybkie linki
            </Typography>
            <Box display="flex" flexDirection="column" gap={0.5}>
              <Link href="/" color="inherit" underline="hover" variant="body2" sx={{ color: 'grey.400' }}>
                Strona główna
              </Link>
              <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ color: 'grey.400' }}>
                Regulamin
              </Link>
              <Link href="#" color="inherit" underline="hover" variant="body2" sx={{ color: 'grey.400' }}>
                Polityka prywatności
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} md={3}>
            <Typography variant="h6" color="inherit" gutterBottom sx={{ fontSize: '1rem', fontWeight: 'bold' }}>
              Kontakt
            </Typography>
            <Typography variant="body2" color="grey.500" sx={{ mb: 1 }}>
              ul. Przykładowa 123, 00-000 Gdańsk<br />
              Email: kontakt@wypozyczalnia.pl<br />
              Tel: +48 123 456 789
            </Typography>
            
            <Box>
              <IconButton color="inherit" size="small" aria-label="Facebook">
                <FacebookIcon fontSize="small" />
              </IconButton>
              <IconButton color="inherit" size="small" aria-label="Instagram">
                <InstagramIcon fontSize="small" />
              </IconButton>
              <IconButton color="inherit" size="small" aria-label="Twitter">
                <TwitterIcon fontSize="small" />
              </IconButton>
            </Box>
          </Grid>

        </Grid>

        <Box textAlign="center" pt={2} mt={2} borderTop={1} borderColor="rgba(255,255,255,0.1)">
          <Typography variant="caption" color="grey.600">
            © {new Date().getFullYear()} Wypożyczalnia Samochodów.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;