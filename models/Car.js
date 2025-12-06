const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  brand: {
    type: String,
    required: [true, 'Marka samochodu jest wymagana'],
    trim: true
  },
  model: {
    type: String,
    required: [true, 'Model samochodu jest wymagany'],
    trim: true
  },
  registrationNumber: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  pricePerDay: {
    type: Number,
    required: true,
    min: 0
  },
  imageUrl: {
    type: String,
    default: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true 
});

module.exports = mongoose.model('Car', carSchema);