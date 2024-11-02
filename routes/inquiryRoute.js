import express from 'express';
import { getInquiry, getInquiryByIdAndName, getLatestInquiry, saveInquiry, updateInquiry } from '../controllers/inquiryController';
const router = express.Router();

router.post('/saveInquiry', saveInquiry);
router.get('/getInquiry', getInquiry);
router.get('/getInquiryByIdAndName', getInquiryByIdAndName);
router.put('/getLatestInquiry', getLatestInquiry);
router.put('/updateInquir', updateInquiry);

export default router;