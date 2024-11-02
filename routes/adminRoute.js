import express from 'express';
const router = express.Router();

import { verifyAdmin, logOut, updateAdmin, createAdmin, getAdminDetails, searchAdmin, updatePassword } from '../controllers/adminController.js';

router.get('/getAdmin', getAdminDetails); 
router.post('/createAdmin', createAdmin);
router.get('/verifyAdmin', verifyAdmin);
router.get('/searchAdmin', searchAdmin);
router.put('/updatePassword', updatePassword);
router.put('/updateAdmin', updateAdmin);
router.post('/logout', logOut);

export default router;