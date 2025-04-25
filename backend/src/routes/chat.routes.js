import express from 'express';
import { getChat, sendMessage } from '../controllers/chat.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();

router.use(protect);

router.get('/:id', getChat);
router.post('/:id/messages', sendMessage);

// module.exports = router;
export default router;