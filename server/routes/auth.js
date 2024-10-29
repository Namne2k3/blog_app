const express = require('express')
const router = express.Router();

const { AuthRegister, AuthLogin, AuthLogout, AuthRefetch } = require('../controller/authController')

// Default
router.get('/', (req, res) => {
    res.send("Server Auth is running");
})

// Register
router.post('/register', AuthRegister)

// Login
router.post('/login', AuthLogin)

// Logout
router.get('/logout', AuthLogout)

// refetch
router.get('/refetch', AuthRefetch)

module.exports = router;