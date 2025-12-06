const Reservation = require('../models/Reservation');
const Car = require('../models/Car');

// @desc    Utwórz nową rezerwację
// @route   POST /api/reservations
// @access  Public
const createReservation = async (req, res) => {
  try {
    const { car, startDate, endDate, customer, notes } = req.body;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: 'Daty rozpoczęcia i zakończenia są wymagane' });
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    const carDetails = await Car.findById(car);
    if (!carDetails) {
      return res.status(404).json({ message: 'Wybrany samochód nie istnieje' });
    }

    const existingReservation = await Reservation.findOne({
      car: car,
      status: { $ne: 'cancelled' },
      $or: [
        {
          startDate: { $lt: end },
          endDate: { $gt: start }
        }
      ]
    });

    if (existingReservation) {
      return res.status(409).json({ message: 'Ten termin jest już zajęty dla wybranego samochodu.' });
    }

    const timeDiff = end.getTime() - start.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); 
    const totalCost = daysDiff * carDetails.pricePerDay;

    const newReservation = await Reservation.create({
      car,
      customer,
      startDate: start,
      endDate: end,
      totalCost,
      notes: notes || '',
      status: 'confirmed' 
    });

    res.status(201).json(newReservation);

  } catch (error) {
    console.error("BŁĄD REZERWACJI (Szczegóły):", error); 
    console.log("Dane z requestu:", req.body);
    res.status(500).json({ message: 'Błąd podczas tworzenia rezerwacji', error: error.message });
  }
};

// @desc    Pobierz rezerwacje (wszystkie lub dla konkretnego auta)
// @route   GET /api/reservations?carId=...
// @access  Public (lub Private dla Admina)
const getReservations = async (req, res) => {
  try {
    const { carId } = req.query;
    let query = {};

    if (carId) {
      query.car = carId;
    }

    const reservations = await Reservation.find(query)
      .populate('car', 'brand model registrationNumber') 
      .sort({ startDate: 1 });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: 'Błąd pobierania rezerwacji', error: error.message });
  }
};

// @desc    Usuń/Anuluj rezerwację
// @route   DELETE /api/reservations/:id
// @access  Private (Admin)
const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: 'Rezerwacja nie znaleziona' });
    }

    await reservation.deleteOne();
    res.status(200).json({ message: 'Rezerwacja usunięta' });
  } catch (error) {
    res.status(500).json({ message: 'Błąd usuwania rezerwacji', error: error.message });
  }
};

// @desc    Aktualizuj rezerwację (Status, Notatki, Dane klienta)
// @route   PUT /api/reservations/:id
// @access  Private (Admin)
const updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (reservation) {
      reservation.status = req.body.status || reservation.status;
      reservation.notes = req.body.notes || reservation.notes;
      
      if (req.body.customer) {
        reservation.customer.firstName = req.body.customer.firstName || reservation.customer.firstName;
        reservation.customer.lastName = req.body.customer.lastName || reservation.customer.lastName;
        reservation.customer.email = req.body.customer.email || reservation.customer.email;
        reservation.customer.phone = req.body.customer.phone || reservation.customer.phone;
      }

      const updatedReservation = await reservation.save();
      
      await updatedReservation.populate('car', 'brand model registrationNumber');
      
      res.json(updatedReservation);
    } else {
      res.status(404).json({ message: 'Rezerwacja nie znaleziona' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Błąd edycji rezerwacji', error: error.message });
  }
};

module.exports = {
  createReservation,
  getReservations,
  deleteReservation,
  updateReservation
};