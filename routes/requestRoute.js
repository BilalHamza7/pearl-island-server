import express from 'express';
import { getLatestRequests, getRequest, getSpecificRequest, saveRequest, updateRequest } from '../controllers/requestController';
const router = express.Router();

router.get('/getRequest', getRequest);
router.post('/saveRequest', saveRequest);
router.get('/getSpecificRequest', getSpecificRequest);
router.put('/getLatestRequests', getLatestRequests);
router.put('/:id', updateRequest);

export default router;