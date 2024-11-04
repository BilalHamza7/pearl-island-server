import express from 'express';
import { getFeaturedProds, saveFeaturedProds } from '../controllers/featuredProdController.js';
const router = express.Router();

router.get('/getFeaturedProds', getFeaturedProds);
router.post('/saveFeaturedProds', saveFeaturedProds);

export default router;