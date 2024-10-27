import express from 'express';
const router = express.Router();

import { verifyAdmin, logOut, updateAdmin } from '../controllers/adminController';

router.get('/verifyAdmin', verifyAdmin); 
router.put('/:id', updateAdmin);
router.post('/logout', logOut);
router.put()

export default router;