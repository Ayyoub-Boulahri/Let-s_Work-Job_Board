const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes'); // Adjust the path based on your project structure
const db = require('./db'); // Adjust the path based on your project structure

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }));
app.use(express.json());

// Use express-session middleware for managing sessions
app.use(session({
  secret: 'your_secret_key',
  cookie: {
    sameSite: 'strict',
    maxAge: 3600 * 24 * 60 * 60,
  },
}));

// Use authentication routes
app.use('/api/login', authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
