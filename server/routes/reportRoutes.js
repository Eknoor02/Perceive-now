const express = require('express');
const router = express.Router();
const reportController = require('../controllers/reportController');
const authMiddleware = require('../middleware/auth'); // For optional auth

// GET all reports - accessible by viewer or reviewer [cite: 22]
router.get('/reports', authMiddleware.authenticateToken(['viewer', 'reviewer']), reportController.getReports);

// POST feedback for a report - accessible by viewer or reviewer [cite: 23]
router.post('/feedback', authMiddleware.authenticateToken(['viewer', 'reviewer']), reportController.submitFeedback);

module.exports = router;