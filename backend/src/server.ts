import app from './app';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api`);
  console.log(`📊 Health: http://localhost:${PORT}/api/health`);
  console.log(`📊 Budgets: http://localhost:${PORT}/api/budgets`);
});

// Keep process alive
setInterval(() => {
  // Keep event loop running
}, 1000);

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received: Closing server');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received: Closing server');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
