import { Router } from 'express';
import * as childController from '../controllers/childController';

const router = Router();

router.post('/', childController.createChild);
router.get('/', childController.getChildren);
router.get('/:childId', childController.getChildById);
router.put('/:childId', childController.updateChild);
router.delete('/:childId', childController.deleteChild);

export default router;
