
const mongoose = require('mongoose');
const config = require('./index');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log(`MongoDB connected: ${conn.connection.host}`);
    return conn;
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);

    // Never use temporary storage in production.
    if (config.nodeEnv === 'production') {
      throw error;
    }

    // In-memory MongoDB is only for local development.
    console.log('Starting in-memory MongoDB for local development...');

    const { MongoMemoryServer } = require('mongodb-memory-server');
    const mongod = await MongoMemoryServer.create();

    const conn = await mongoose.connect(mongod.getUri());

    console.log('In-memory MongoDB connected for local development.');
    return conn;
  }
};

module.exports = connectDB;
