const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

// @desc    Rejestracja nowego użytkownika
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Proszę podać email i hasło' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'Użytkownik o tym emailu już istnieje' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      password: hashedPassword,
      isAdmin: false
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(400).json({ message: 'Nieprawidłowe dane użytkownika' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};

// @desc    Logowanie użytkownika i pobieranie tokena
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user.id,
        email: user.email,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Nieprawidłowy email lub hasło' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Błąd logowania', error: error.message });
  }
};

const generateToken = (id) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('FATAL ERROR: JWT_SECRET is not defined.');
  }

  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = {
  registerUser,
  loginUser,
};