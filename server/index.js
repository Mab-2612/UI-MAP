const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGO_URI, { 
    family: 4 // <--- Forces IPv4 (Fixes the ESERVFAIL issue)
})
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch((err) => console.error('❌ MongoDB Connection Error:', err));

// Routes
const authRoute = require('./routes/auth');
app.use('/api/auth', authRoute);

// --- LOCATION ROUTES (Directly here for simplicity) ---
const Location = require('./models/Location');

// GET ALL
app.get('/api/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST (ADD NEW)
app.post('/api/locations', async (req, res) => {
  try {
    const newLocation = new Location(req.body);
    const savedLocation = await newLocation.save();
    res.status(201).json(savedLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT (UPDATE EXISTING)
app.put('/api/locations/:id', async (req, res) => {
  try {
    // We search by our custom 'id' string (e.g. 'fac-tech'), not the mongo _id
    const updatedLocation = await Location.findOneAndUpdate(
      { id: req.params.id }, 
      req.body, 
      { new: true } // Return the updated version
    );
    res.json(updatedLocation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE
app.delete('/api/locations/:id', async (req, res) => {
  try {
    // Note: We use findOneAndDelete because we use custom string IDs (e.g., 'fac-tech') 
    // instead of MongoDB's _id for some items.
    await Location.findOneAndDelete({ id: req.params.id });
    res.json({ message: "Location deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});