const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const controller = require('../controllers/request.controller');

// Resident APIs
router.post('/', upload.single('media'), controller.createRequest);
router.get('/resident/:id', controller.getResidentRequests);

// Admin APIs
router.get('/', controller.getAllRequests);
router.put('/:id/status', controller.updateRequestStatus);

// Technician APIs
router.get('/technician/:id', controller.getTechnicianRequests);

module.exports = router;
