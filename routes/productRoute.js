import express from 'express';
import { getKindCount, getLatestProducts, getProductById, getProducts, saveProduct } from '../controllers/productController.js';
const router = express.Router();

router.get('/getProducts', getProducts);
router.post('/getProductById', getProductById);
router.post('/saveProduct', saveProduct);
router.get('/getKindCount', getKindCount);
router.get('/getLatestProducts', getLatestProducts);
// router.put('/updateProduct/:id', updateProduct);
// router.delete('/deleteProduct/:id', deleteProduct);

export default router;