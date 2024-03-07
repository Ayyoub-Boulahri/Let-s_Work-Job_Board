const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./routes/authRoutes');
const countriesRoutes = require('./routes/countriesRoutes');
const industriesRoutes = require('./routes/industriesRoutes')
const signinRoutes = require('./routes/signupRoutes')
const skillsRoutes = require('./routes/skillsRoutes')
const employeesRoutes = require('./routes/employeeRoutes')
const companiesRoutes = require('./routes/companiesRoutes')
const jobOfferRoutes = require('./routes/jobOfferRoutes')
const currenciesRoutes = require('./routes/currenciesRoutes')
const notificationsRoutes = require('./routes/notificationsRoutes')
const http = require('http'); // Import http module
const socketIo = require('socket.io'); // Import socket.io

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(cors({
  origin: ['http://localhost:5173', 'http://192.168.1.13:5173'],
  credentials: true,
}));

// Use express-session middleware for managing sessions
app.use(session({
  secret: 'secret_key',
  cookie: {
    sameSite: 'Lax',
    maxAge: 3600 * 24 * 60 * 60,
  },
}));

const server = http.createServer(app);

// Initialize Socket.io
const io = socketIo(server, {
  cors: {
    origin: ['http://localhost:5173', 'http://192.168.1.13:5173'],
    methods: ["GET", "POST", "PUT"],
    credentials: true
  },
  allowEIO3: true, // Enable Engine.IO v3 protocol for better performance
  maxHttpBufferSize: 1e8, // Increase maximum HTTP buffer size
  pingInterval: 10000, // Adjust ping interval as needed
  pingTimeout: 5000
});

const connectedUsers = {};

io.on('connection', (socket) => {
  const userId = socket.handshake.query.userId;

  // Store the user's socket ID along with their user ID
  connectedUsers[userId] = socket.id;

  // Handle disconnection event to remove user from the mapping
  socket.on('disconnect', () => {
    delete connectedUsers[userId];
  });
});

// Use authentication routes
app.use('/api/login', authRoutes);
app.use('/api/countries', countriesRoutes)
app.use('/api/industries', industriesRoutes)
app.use('/api/signup', signinRoutes)
app.use('/api/skills', skillsRoutes)
app.use('/api/employees', employeesRoutes)
app.use('/api/companies', companiesRoutes(io, connectedUsers))
app.use('/api/jobOffers', jobOfferRoutes(io, connectedUsers))
app.use('/api/currencies', currenciesRoutes)
app.use('/api/notifications', notificationsRoutes)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});