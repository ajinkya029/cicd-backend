const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const healthRoutes = require('./routes/health.routes');
const taskRoutes = require('./routes/task.routes');
const { notFound, errorHandler } = require('./middleware/error.middleware');

function createApp() {
  const app = express();
  app.use(helmet());
  app.use(cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : '*'
  }));
  app.use(express.json({ limit: '1mb' }));
  if (process.env.NODE_ENV !== 'test') app.use(morgan('dev'));

  app.get('/', (_req, res) => res.json({
    name: 'MERN CI/CD Backend',
    status: 'running',
    docs: 'See README.md for API endpoints'
  }));
  app.use('/api/health', healthRoutes);
  app.use('/api/tasks', taskRoutes);
  app.use(notFound);
  app.use(errorHandler);
  return app;
}

module.exports = { createApp };
