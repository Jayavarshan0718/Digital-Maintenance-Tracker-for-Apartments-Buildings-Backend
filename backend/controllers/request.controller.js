const db = require('../db');

// CREATE maintenance request (Resident)
exports.createRequest = (req, res) => {
  const { resident_id, category, description } = req.body;
  const media = req.file ? req.file.filename : null;

  if (!resident_id || !category || !description) {
    return res.status(400).json({ message: 'All fields required' });
  }

  const sql = `
    INSERT INTO maintenance_requests
    (resident_id, category, description, media)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [resident_id, category, description, media], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Request created successfully' });
  });
};

// GET request history by resident
exports.getResidentRequests = (req, res) => {
  const residentId = req.params.id;

  const sql = `
    SELECT id, category, description, status, created_at
    FROM maintenance_requests
    WHERE resident_id = ?
    ORDER BY created_at DESC
  `;

  db.query(sql, [residentId], (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// UPDATE request status (Admin / Staff)
exports.updateRequestStatus = (req, res) => {
  const requestId = req.params.id;
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ message: 'Status is required' });
  }

  const sql = `
    UPDATE maintenance_requests
    SET status = ?
    WHERE id = ?
  `;

  db.query(sql, [status, requestId], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: 'Status updated successfully' });
  });
};

// GET all requests (Admin)
exports.getAllRequests = (req, res) => {
  const sql = `
    SELECT id, resident_id, category, description, status, created_at
    FROM maintenance_requests
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
};

// GET technician requests
exports.getTechnicianRequests = (req, res) => {
  const technicianId = req.params.id;
  
  const sql = `
    SELECT id, resident_id, category, description, status, created_at
    FROM maintenance_requests
    WHERE status IN ('Pending', 'In Progress') OR status IS NULL
    ORDER BY created_at DESC
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Technician query error:', err);
      return res.status(500).json(err);
    }
    res.json(results);
  });
};
