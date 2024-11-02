import express from 'express';
import { getLatestRequests, getRequest, getSpecificRequest, saveRequest, updateRequest } from '../controllers/requestController.js';
const router = express.Router();

router.get('/getRequest', getRequest);
router.post('/saveRequest', saveRequest);
router.get('/getSpecificRequest', getSpecificRequest);
router.put('/getLatestRequests', getLatestRequests);
router.put('/updateRequest/:id', updateRequest);

export default router;