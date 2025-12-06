const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/authController');

// Ścieżka: /api/auth/register
// Opis: Rejestracja nowego konta
router.post('/register', registerUser);

// Ścieżka: /api/auth/login
// Opis: Logowanie do istniejącego konta
router.post('/login', loginUser);

module.exports = router;