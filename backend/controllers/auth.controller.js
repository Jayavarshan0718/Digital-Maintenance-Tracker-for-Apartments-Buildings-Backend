const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your-secret-key'; // move to .env later

// ===================== SIGNUP =====================
exports.signup = (req, res) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Check existing user
  const checkSql = 'SELECT id FROM users WHERE email = ?';
  db.query(checkSql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });

    if (results.length > 0) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const insertSql =
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)';

    db.query(
      insertSql,
      [name, email, hashedPassword, role || 'resident'],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Insert failed' });

        res.status(201).json({
          message: 'User registered successfully'
        });
      }
    );
  });
};

// ===================== SIGNIN =====================
exports.signin = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const sql = 'SELECT * FROM users WHERE email = ?';

  db.query(sql, [email], async (err, results) => {
    if (err) return res.status(500).json({ message: 'DB error' });

    if (results.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const user = results[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  });
};
