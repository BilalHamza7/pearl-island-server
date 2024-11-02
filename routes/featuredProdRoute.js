import express from 'express';
import { getFeaturedProd, saveFeaturedProd } from '../controllers/featuredProdController.js';
const router = express.Router();

router.get('/getFeaturedProd', getFeaturedProd);
router.post('/saveFeaturedProd', saveFeaturedProd);

export default router;