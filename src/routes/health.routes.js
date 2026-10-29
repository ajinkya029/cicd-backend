const router = require('express').Router();
const mongoose = require('mongoose');

router.get('/', (_req, res) => {
  const dbState = mongoose.connection.readyState;
  const database = dbState === 1 ? 'connected' : 'disconnected';
  res.status(dbState === 1 ? 200 : 503).json({
    status: dbState === 1 ? 'ok' : 'degraded',
    database,
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
