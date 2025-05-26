const express = require('express');
const cors = require('cors');
const path = require('path');
const interviewRoutes = require('./routes/interviews');

const app = express();
app.use(cors());
app.use(express.json());

// API
app.use('/api/interviews', interviewRoutes);

// Serve React build
app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
