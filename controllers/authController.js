const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../middlewares/authMiddleware');

// Login Controller
const login = async (request, h) => {
  const { email, password } = request.payload;

  try {
    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      return h.response({ message: 'User not found' }).code(404);
    }

    const isPasswordValid = await bcrypt.compare(password, userData.password);
    if (!isPasswordValid) {
      return h.response({ message: 'Invalid password' }).code(401);
    }

    const token = jwt.sign({ userId: userData.id_user }, secretKey, { expiresIn: '1h' });

    return h.response({
      message: 'Login successful',
      token,
    }).code(200);
  } catch (error) {
    console.error(error);
    return h.response({ message: 'Internal server error' }).code(500);
  }
};

// Register Controller
const register = async (request, h) => {
  const { email, password } = request.payload;

  if (!email || !password) {
    return h.response({ message: 'Email and password are required' }).code(400);
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return h.response({ message: 'Email already registered' }).code(400);
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = await User.create({
      email,
      password: hashedPassword,
    });

    return h.response({
      message: 'Registration successful',
      user: { id_user: newUser.id_user, email: newUser.email },
    }).code(201);
  } catch (error) {
    console.error('Register error:', error);
    return h.response({ message: 'Internal server error' }).code(500);
  }
};


module.exports = { login, register};
