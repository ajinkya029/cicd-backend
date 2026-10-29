require('dotenv').config();
const mongoose = require('mongoose');
const { createApp } = require('./app');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mern_cicd';

async function start() {
  try {
    await mongoose.connect(MONGODB_URI, { serverSelectionTimeoutMS: 10000 });
    console.log('MongoDB connected');
    const app = createApp();
    const server = app.listen(PORT, () => console.log(`API listening on port ${PORT}`));

    const shutdown = async (signal) => {
      console.log(`${signal} received; shutting down`);
      server.close(async () => {
        await mongoose.connection.close();
        process.exit(0);
      });
    };
    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));
  } catch (error) {
    console.error('Startup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) start();
module.exports = { start };
