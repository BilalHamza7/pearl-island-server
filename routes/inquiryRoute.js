import express from 'express';
const router = express.Router();

router.get('/', getInquiries);
router.post('/', saveInquiry);
router.get('/:id', getInquiry);
router.put('/:id', updateInquiry);

export default router;