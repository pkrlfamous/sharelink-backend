const express = require('express');
const linkController = require('../controllers/linkController');

const router = express.Router();
router.get('/', linkController.getALink);
router.get('/:id', linkController.getLinks);
router.post('/createlink', linkController.createLink);
router.put('/:id', linkController.updateLink);
router.delete('/:id', linkController.deleteLink);
module.exports = router;
