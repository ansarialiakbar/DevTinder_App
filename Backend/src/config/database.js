// Database connection configuration
const mongoose = require('mongoose');

const connectDB = async () => {
    await mongoose.connect('mongodb+srv://ali_akbar:*aliakbar12345@cluster0.wnf0h.mongodb.net/Devtinder')
}

module.exports = connectDB