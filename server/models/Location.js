const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  id: { 
    type: String, 
    required: true, 
    unique: true 
  },
  name: { 
    type: String, 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  parent: { 
    type: String, 
    required: false // Optional, for departments inside faculties
  },
  description: { 
    type: String, 
    required: false,
    default: "No description available."
  },
  coordinates: {
    type: [Number], // Expecting [lat, lng]
    required: true,
    index: '2dsphere' // Geo-spatial index for faster search
  },
  image: { 
    type: String, 
    required: false 
  }
}, { timestamps: true });

module.exports = mongoose.model('Location', LocationSchema);