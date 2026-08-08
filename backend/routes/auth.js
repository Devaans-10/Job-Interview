const express = require('express');
const router = express.Router();
const authService = require('../services/authService');
const verifyToken = require('../middleware/auth');

// POST /api/auth/signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required' });
    }

    const result = await authService.signup(name, email, password);
    res.status(201).json(result);
  } catch (error) {
    if (error.message.includes('already registered') || error.message.includes('Password must be')) {
      return res.status(400).json({ error: error.message });
    }
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Server error during signup' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await authService.login(email, password, rememberMe);
    res.json(result);
  } catch (error) {
    if (error.message === 'Email or password incorrect') {
      return res.status(401).json({ error: error.message });
    }
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  // On the backend, we just acknowledge. The frontend will delete the token.
  res.json({ success: true, message: 'Logged out successfully' });
});

// GET /api/auth/me (Protected)
router.get('/me', verifyToken, (req, res) => {
  // req.user contains the decoded JWT payload { userId, email, name, ... }
  res.json({
    user: {
      userId: req.user.userId,
      email: req.user.email,
      name: req.user.name
    }
  });
});

// GET /api/auth/verify (Protected)
router.get('/verify', verifyToken, (req, res) => {
  res.json({ valid: true });
});

module.exports = router;
