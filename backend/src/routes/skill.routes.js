import express from 'express';

import { 
    getSkillSwaps, 
    getUserSkillSwaps, 
    createSkillSwap, 
    updateSkillSwap,
    deleteSkillSwap 
} from '../controllers/skill.controller.js';
import { protect } from '../middleware/auth.middleware.js';
const router = express.Router();

router.use(protect);

router.get('/', getSkillSwaps);
router.get('/user/:userId', getUserSkillSwaps);
router.post('/', createSkillSwap);
router.put('/:id', updateSkillSwap);
router.delete('/:id', deleteSkillSwap);

// module.exports = router;
export default router;