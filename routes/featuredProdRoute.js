import express from 'express';
const router = express.Router();

router.get('/', getFeaturedProd);
router.post('/', saveFeaturedProd);

export default router;