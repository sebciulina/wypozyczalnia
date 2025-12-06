const express = require('express');
const router = express.Router();
const { 
  createReservation, 
  getReservations, 
  deleteReservation,
  updateReservation 
} = require('../controllers/resController');

const { protect, admin } = require('../middleware/authMiddleware');

// Ścieżka: /api/reservations
// Opis: Pobierz rezerwacje (GET) oraz Utwórz nową (POST)
router.route('/')
  .get(getReservations)
  .post(createReservation);

// Ścieżka: /api/reservations/:id
// Opis: Usuń/Anuluj rezerwację (DELETE)
router.route('/:id')
  .delete(protect, admin, deleteReservation)
  .put(protect, admin, updateReservation);

module.exports = router;