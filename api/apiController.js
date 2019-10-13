const express = require('express');
const router = express.Router();
const apiService = require('./apiService.js');

router.get('/:product_id', apiService.findByID);
router.post('/', apiService.create);
router.delete('/:product_name',apiService.deleteByName);
router.put('/:product_id',apiService.updateByID);
module.exports = router;