const Car = require('../models/Car');

// @desc    Pobierz wszystkie samochody
// @route   GET /api/cars
// @access  Public
const getCars = async (req, res) => {
  try {
    const cars = await Car.find();
    
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera podczas pobierania aut', error: error.message });
  }
};

// @desc    Pobierz jeden samochód po ID
// @route   GET /api/cars/:id
// @access  Public
const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Nie znaleziono samochodu o podanym ID' });
    }

    res.status(200).json(car);
  } catch (error) {
    if (error.kind === 'ObjectId') {
        return res.status(404).json({ message: 'Nie znaleziono samochodu (błędne ID)' });
    }
    res.status(500).json({ message: 'Błąd serwera', error: error.message });
  }
};

// @desc    Dodaj nowy samochód
// @route   POST /api/cars
// @access  Private (Admin) - na razie Publiczne do testów
const createCar = async (req, res) => {
  try {
    const newCar = await Car.create(req.body);

    res.status(201).json(newCar);
  } catch (error) {
    res.status(400).json({ message: 'Nie udało się dodać samochodu', error: error.message });
  }
};

// @desc    Usuń samochód
// @route   DELETE /api/cars/:id
// @access  Private (Admin)
const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);

    if (!car) {
      return res.status(404).json({ message: 'Samochód nie istnieje' });
    }

    await car.deleteOne();
    res.status(200).json({ message: 'Samochód został usunięty' });
  } catch (error) {
    res.status(500).json({ message: 'Błąd serwera podczas usuwania', error: error.message });
  }
};

module.exports = {
  getCars,
  getCarById,
  createCar,
  deleteCar
};