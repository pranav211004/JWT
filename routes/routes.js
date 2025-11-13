const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const users = require('../users');
const { verifyToken, authorizeRoles } = require('../middleware/auth');

dotenv.config();
const router = express.Router();

// Login route
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);
  if (!user) return res.status(404).json({ message: 'User not found.' });

  const validPassword = bcrypt.compareSync(password, user.password);
  if (!validPassword)
    return res.status(401).json({ message: 'Invalid password.' });

  const token = jwt.sign(
    { id: user.id, username: user.username, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ message: 'Login successful.', token });
});

// Protected routes
router.get(
  '/admin',
  verifyToken,
  authorizeRoles('Admin'),
  (req, res) => {
    res.json({ message: `Welcome Admin ${req.user.username}` });
  }
);

router.get(
  '/moderator',
  verifyToken,
  authorizeRoles('Moderator', 'Admin'),
  (req, res) => {
    res.json({ message: `Hello Moderator ${req.user.username}` });
  }
);

router.get(
  '/user',
  verifyToken,
  authorizeRoles('User', 'Moderator', 'Admin'),
  (req, res) => {
    res.json({ message: `User Profile: ${req.user.username}` });
  }
);

module.exports = router;
