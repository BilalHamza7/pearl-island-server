import express from 'express';
import { getKindCount } from '../controllers/productController';
const router = express.Router();

router.get('/getProduct', getProducts);
router.post('/saveProduct', saveProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.get('/getKindCount', getKindCount);

export default router;