import express from 'express';
import { getInquirys, getInquiryByIdAndName, getLatestInquirys, saveInquiry, updateInquiry } from '../controllers/inquiryController.js';
const router = express.Router();

router.post('/saveInquiry', saveInquiry);
router.get('/getInquirys', getInquirys);
router.get('/getInquiryByIdAndName', getInquiryByIdAndName);
router.put('/getLatestInquirys', getLatestInquirys);
router.put('/updateInquiry', updateInquiry);

export default router;