const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

// Registration
router.post('/register', async (req, res) => {
  console.log(username, email, password);
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Authentication
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword)
      return res.status(400).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ _id: user._id }, 'your_secret_key_here');
    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;