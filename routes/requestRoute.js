import express from 'express';
import { getLatestRequests, getRequests, getSpecificRequest, saveRequest, updateRequest } from '../controllers/requestController.js';
const router = express.Router();

router.get('/getRequests', getRequests);
router.post('/saveRequest', saveRequest);
router.get('/getSpecificRequest', getSpecificRequest);
router.put('/getLatestRequests', getLatestRequests);
router.put('/updateRequest', updateRequest);

export default router;