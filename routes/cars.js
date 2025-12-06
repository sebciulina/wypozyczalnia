const express = require('express');
const router = express.Router();
const { 
  getCars, 
  createCar, 
  getCarById, 
  deleteCar 
} = require('../controllers/carController');

const { protect, admin } = require('../middleware/authMiddleware');

// Ścieżka: /api/cars
// Opis: Pobierz wszystkie auta (GET) oraz Dodaj nowe auto (POST)
router.route('/')
  .get(getCars)
  .post(protect, admin, createCar);

// Ścieżka: /api/cars/:id
// Opis: Pobierz jedno auto (GET) oraz Usuń auto (DELETE)
router.route('/:id')
  .get(getCarById)
  .delete(protect, admin, deleteCar);

module.exports = router;