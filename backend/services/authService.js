const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const usersFilePath = path.join(__dirname, '../data/users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-for-development';

// Helper to read users from JSON file
function readUsers() {
  try {
    if (!fs.existsSync(usersFilePath)) {
      return [];
    }
    const data = fs.readFileSync(usersFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading users file:', error);
    return [];
  }
}

// Helper to write users to JSON file
function writeUsers(users) {
  try {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (error) {
    console.error('Error writing users file:', error);
    throw new Error('Failed to save user data');
  }
}

// Signup
async function signup(name, email, password) {
  const users = readUsers();
  
  if (users.find(u => u.email === email)) {
    throw new Error('This email is already registered');
  }

  // Basic password validation
  if (password.length < 8 || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
    throw new Error('Password must be 8+ chars with uppercase and number');
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHash = await bcrypt.hash(password, salt);

  const newUser = {
    userId: crypto.randomUUID(),
    email,
    name,
    passwordHash,
    createdAt: new Date().toISOString(),
    lastLogin: new Date().toISOString()
  };

  users.push(newUser);
  writeUsers(users);

  const token = jwt.sign(
    { userId: newUser.userId, email: newUser.email, name: newUser.name },
    JWT_SECRET,
    { expiresIn: '24h' }
  );

  return {
    token,
    user: {
      userId: newUser.userId,
      email: newUser.email,
      name: newUser.name
    }
  };
}

// Login
async function login(email, password, rememberMe = false) {
  const users = readUsers();
  const user = users.find(u => u.email === email);

  if (!user) {
    throw new Error('Email or password incorrect');
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new Error('Email or password incorrect');
  }

  // Update last login
  user.lastLogin = new Date().toISOString();
  writeUsers(users);

  const expiresIn = rememberMe ? '30d' : '24h';
  
  const token = jwt.sign(
    { userId: user.userId, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn }
  );

  return {
    token,
    user: {
      userId: user.userId,
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
