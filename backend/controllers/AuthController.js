const mongoose = require('mongoose');
const Employee = require('../models/employee');
const Company = require('../models/company');
const bcrypt = require('bcryptjs');

class AuthController {
  employeeLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      // Retrieve the user record from the database based on the provided email
      const user = await Employee.findOne({ email });

      if (!user) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare the hashed password stored in the database with the user-provided password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // If passwords match, proceed with the login process
      req.session.userId = user._id;
      req.session.email = email;
      req.session.auth = true;
      req.session.typeUser = 'employee';

      return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  companyLogin = async (req, res) => {
    const { email, password } = req.body;

    try {
      // Retrieve the user record from the database based on the provided email
      const company = await Company.findOne({ company_email: email, isApproved: true });

      if (!company) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // Compare the hashed password stored in the database with the user-provided password
      const passwordMatch = await bcrypt.compare(password, company.password);

      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      // If passwords match, proceed with the login process
      req.session.userId = company._id;
      req.session.email = email;
      req.session.auth = true;
      req.session.typeUser = 'company';

      return res.status(200).json({ message: 'Login successful' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  checkAuthentication = (req, res) => {
    if (req.session.auth) {
      const { email, auth, typeUser, userId } = req.session;
      // If authenticated, send the information
      return res.status(200).json({ email, auth, typeUser, userId });
    } else {
      return res.status(401).json({ error: 'Not authenticated' });
    }
  };

  logout = (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
      return res.status(200).json({ message: 'Logout successful' });
    });
  };
}

module.exports = new AuthController();
