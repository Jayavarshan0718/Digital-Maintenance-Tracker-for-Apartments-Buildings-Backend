const cors = require('cors'); 

const express = require('express');
const app = express();
const requestRoutes = require('./routes/request.routes');
const authRoutes = require('./routes/auth.routes');

app.use(cors());

app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

app.use('/api/requests', requestRoutes);
app.use('/api/auth', authRoutes);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
