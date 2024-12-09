import express from 'express';
const router = express.Router();

import { verifyAdmin, logOut, updateAdmin, createAdmin, getAdminDetails, searchAdmin, updatePassword } from '../controllers/adminController.js';

const isAdminAuthenticated = (req, res, next) => {
    if (req.session && req.session.admin) {
        return next(); 
    }

    return res.status(401).json({ message: 'Unauthorized. Please log in as admin.' });
};

router.get('/getAdminDetails', isAdminAuthenticated, getAdminDetails); 
router.post('/createAdmin', createAdmin);
router.post('/verifyAdmin', verifyAdmin); // log in
router.get('/searchAdmin', searchAdmin); // searching user for password reset
router.put('/updatePassword', updatePassword); // resetting password
router.put('/updateAdmin', isAdminAuthenticated, updateAdmin); // resetting admin details
router.post('/logout', logOut); 

export default router;