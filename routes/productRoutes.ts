import { Router } from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controller/ProductController';

const router = Router();

// GET all products
router.get('/', getAllProducts);
// GET one product by id
router.get('/:id', getProductById);
// POST create product
router.post('/', createProduct);
// PUT update product
router.put('/:id', updateProduct);
// DELETE product
router.delete('/:id', deleteProduct);

export default router; 