const express = require('express');
const router = express.Router();
const { store, authenticate } = require('../controllers/userController')

router.post('/register', store);
router.post('/authenticate', authenticate)

module.exports = router;