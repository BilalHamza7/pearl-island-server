import express from 'express';
const router = express.Router();

router.get('/', getProducts);
router.post('/', saveProduct);
router.get('/:id', getProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;