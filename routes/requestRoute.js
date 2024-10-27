import express from 'express';
const router = express.Router();

router.get('/', getRequests);
router.post('/', saveRequest);
router.get('/:id', getRequest);
router.put('/:id', updateRequest);

export default router;