const bcrypt = require('bcryptjs');

// Normally, you'd store users in a database.
const users = [
  {
    id: 1,
    username: 'admin',
    password: bcrypt.hashSync('admin123', 10),
    role: 'Admin'
  },
  {
    id: 2,
    username: 'moderator',
    password: bcrypt.hashSync('mod123', 10),
    role: 'Moderator'
  },
  {
    id: 3,
    username: 'user',
    password: bcrypt.hashSync('user123', 10),
    role: 'User'
  }
];

module.exports = users;
