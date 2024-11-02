import express from 'express';
import { getKindCount, getProducts, saveProduct } from '../controllers/productController.js';
const router = express.Router();

router.get('/getProduct', getProducts);
router.post('/saveProduct', saveProduct);
router.get('/getKindCount', getKindCount);
// router.put('/updateProduct/:id', updateProduct);
// router.delete('/deleteProduct/:id', deleteProduct);

export default router;