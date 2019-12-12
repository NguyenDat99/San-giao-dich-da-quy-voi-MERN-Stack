import express from 'express';
import CategoryController from '../modules/category/controller/category.controller';
import CategoryValidate from '../modules/category/middleware/category.middleware';

const router = express.Router();

// POST
router.post('/category/', CategoryValidate.createCategoryInput, CategoryController.createCategory);

// PUT
router.put('/category/:category_id', CategoryValidate.updateCategoryInput, CategoryController.updateCategory);

// GET
router.get('/category', CategoryValidate.getAllCategoryInput, CategoryController.getAllCategories);
router.get('/category/:category_id', CategoryValidate.getCategoryInput, CategoryController.getCategory);
// DELETE
router.delete('/category/:category_id', CategoryValidate.blockCategoryInput, CategoryController.blockCategory);
export default router;
