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

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));


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
app.use('/api/countries', countriesRoutes)
app.use('/api/industries', industriesRoutes)
app.use('/api/signup', signinRoutes)
app.use('/api/skills', skillsRoutes)
app.use('/api/employees', employeesRoutes)
app.use('/api/companies', companiesRoutes)
app.use('/api/jobOffers', jobOfferRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});