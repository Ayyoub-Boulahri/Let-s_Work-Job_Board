const mongoose = require('mongoose');
const Employee = require('../models/employee');
const Company = require('../models/company');

class AuthController {
  employeeLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const result = await Employee.findOne({ email, password });

      if (!result) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      req.session.userId = result._id;
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
      const result = await Company.findOne({ company_email: email, password: password, isApproved: true });
      
      if (!result) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      req.session.userId = result._id;  
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
      console.log(email)
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
