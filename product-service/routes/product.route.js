var expiress = require('express');
var router = expiress.Router();
const ProductController = require('../controllers/product.controller');


router.get('/', ProductController.ProductAll);
router.post('/', ProductController.AddProduct);
router.get('/:id', ProductController.ProductById);
router.put('/:id', ProductController.EditProduct);
router.delete('/:id', ProductController.DeleteProduct);

module.exports = router;