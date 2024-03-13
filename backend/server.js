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
const http = require('http');
const socketIo = require('socket.io');
const schedule = require('node-schedule');
const JobOffer = require('./models/jobOffer'); // Import your JobOffer model
const { trusted } = require('mongoose');


const bcrypt = require('bcryptjs');
const Employee = require("./models/employee");

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
  allowEIO3: true, 
  maxHttpBufferSize: 1e8, 
  pingInterval: 10000,
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


const updateJobStatusTask = schedule.scheduleJob('0 0 * * *', async () => {
    try {
        const currentDate = new Date();

        // Find job offers where the delais_depot has passed and job_status is true
        const expiredJobOffers = await JobOffer.updateMany(
            {
                delais_depot: { $lt: currentDate },
                job_status: true
            },
            { $set: { job_status: false } }
        );

        console.log(`${expiredJobOffers.nModified} job offers updated.`);
    } catch (error) {
        console.error('Error updating job offers:', error);
    }
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