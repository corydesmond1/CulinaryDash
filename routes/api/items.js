const express = require('express');
const router = express.Router();
const itemsCtrl = require('../../controllers/api/items');
const ensureLoggedIn = require('../../config/ensureLoggedIn');

// GET /api/items
router.get('/', ensureLoggedIn, itemsCtrl.index);
// GET /api/items/:id
router.get('/:id', ensureLoggedIn, itemsCtrl.show);

module.exports = router;
