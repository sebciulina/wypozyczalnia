const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();

connectDB();

const app = express();

app.use(cors());                 
app.use(express.json());         

app.get('/', (req, res) => {
  res.send('API Wypożyczalni działa poprawnie!');
});

app.use('/api/cars', require('./routes/cars'));
app.use('/api/reservations', require('./routes/reservations'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API działa (Tryb Deweloperski)');
  });
}

app.listen(PORT, () => {
  console.log(`Serwer działa na porcie ${PORT}`);
});