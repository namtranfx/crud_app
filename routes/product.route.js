const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller.js');

router.get('/', productController.getAllProduct);
router.get('/:id', productController.getProductByID);
router.post('/create', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

module.exports = router;
