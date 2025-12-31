const mysql = require('mysql2');

// create connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456',   // change if needed
  database: 'maintenance_tracker'
});

// connect
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('MySQL Connected');
});

module.exports = db;
