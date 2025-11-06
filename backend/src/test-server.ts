import express from 'express';

const app = express();
const PORT = 5000;

app.get('/test', (req, res) => {
  console.log('Test endpoint hit!');
  res.json({ message: 'Test successful' });
});

app.listen(PORT, () => {
  console.log(`Test server running on http://localhost:${PORT}/test`);
});

// Keep the process alive
setInterval(() => {
  console.log('Server still running...');
}, 5000);
