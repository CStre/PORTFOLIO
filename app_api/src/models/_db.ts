import mongoose from 'mongoose';
require('dotenv').config(); 

// MongoDB connection
const NAME = process.env.DB_NAME;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;
const connectString = `mongodb+srv://${USER}:${PASSWORD}@cluster0.ynnv63f.mongodb.net/?retryWrites=true&w=majority&appName=${NAME}`

mongoose.connect(connectString);

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error:`, err);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});
