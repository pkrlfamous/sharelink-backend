const express = require('express');
const linkController = require('../controllers/linkController');

const router = express.Router();

router.post('/createlink', linkController.createLink);

module.exports = router;
