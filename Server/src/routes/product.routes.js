import express from 'express';
import ProductController from '../modules/product/controller/product.controller';
import ProductValidate from '../modules/product/middleware/product.middleware';

const router = express.Router();

// POST
router.post('/product/', ProductValidate.createProductInput, ProductController.createProduct);

// PUT
router.put('/product/:productId', ProductValidate.updateProductInput, ProductController.updateProduct);
// router.put('product/sold-out/:productId', ProductValidate.soldOutProductInput, ProductController.soldOutProduct);

// GET
router.get('/product/:productId', ProductValidate.getProductInput, ProductController.getProduct);
// router.get('/product/:page/:limit', ProductValidate.getAllProductInput, ProductController.getAllProducts);
//get all products
router.get('/product', ProductValidate.getAllProductInput, ProductController.getAllProducts);
router.get('/product/category/search', ProductValidate.getAllProductInputByCategoryId, ProductController.getAllProducts);

// DELETE
router.delete('/product/:categoryId', ProductValidate.blockProductInput, ProductController.blockProduct);
export default router;
