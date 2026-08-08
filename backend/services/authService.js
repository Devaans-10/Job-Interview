const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

// Signup
async function signup(name, email, password) {
  const existingUser = await User.findOne({ email });
  
  if (existingUser) {
    throw new Error('This email is already registered');
  }

  // Basic password validation
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    throw new Error('Password must be 8+ chars with uppercase and number');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = new User({
    name,
    email,
    passwordHash
  });

  await newUser.save();

  const token = jwt.sign(
    { userId: newUser._id, email: newUser.email, name: newUser.name },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      userId: newUser._id,
      email: newUser.email,
      name: newUser.name
    }
  };
}

// Login
async function login(email, password, rememberMe = false) {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Email or password incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Email or password incorrect');
  }

  const expiresIn = rememberMe ? '30d' : '24h';
  
  const token = jwt.sign(
    { userId: user._id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn }
  );

  return {
    token,
    user: {
      userId: user._id,
      email: user.email,
      name: user.name
    }
  };
}

module.exports = {
  signup,
  login,
  JWT_SECRET
};
