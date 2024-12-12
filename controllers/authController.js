const User = require('../models/userModel');

// Login Controller
const login = async (request, h) => {
  const { email, password } = request.payload;

  try {
    const userData = await User.findOne({ where: { email } });

    if (!userData) {
      return h.response({ message: 'User not found' }).code(404);
    }

    if (password !== userData.password) {
      return h.response({ message: 'Invalid password' }).code(401);
    }

    return h.response({
      message: 'Login successful',
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

    const newUser = await User.create({
      email,
      password, // Password disimpan langsung tanpa hash (Tidak direkomendasikan)
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

module.exports = { login, register };
