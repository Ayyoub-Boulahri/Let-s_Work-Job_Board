const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/employee', (req, res) => {
    const sql = "select * from employee where email = ? and password = ?";
    const { email, password } = req.body;

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Store the email and typeUser and set auth to true in the session
        req.session.email = email;
        req.session.auth = true;
        req.session.typeUser = "employee";
        console.log("Login successful");
        console.log(req.session)
        return res.status(200).json({ message: "Login successful" });
    });
});

router.post('/company', (req, res) => {
    const sql = "select * from company where company_email = ? and password = ? and ISAPPROVED = 1";
    const { email, password } = req.body;

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (result.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Store the email and the typeuser and set auth to true in the session
        req.session.email = email;
        req.session.auth = true;
        req.session.typeUser = "company";
        console.log("Login successful");
        return res.status(200).json({ message: "Login successful" });
    });
});

router.get('/check-authentication', (req, res) => {
    console.log(req.session)
    if (req.session.auth) {
        const { email, auth, typeUser } = req.session;
        // If authenticated, send the information
        res.status(200).json({ email, auth, typeUser });
    } else {
        // If not authenticated, send an error status
        res.status(401).json({ error: 'Not authenticated' });
    }
});

router.get('/logout', (req, res) => {
    // Destroy the session to log the user out
    req.session.destroy((err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
});




module.exports = router;