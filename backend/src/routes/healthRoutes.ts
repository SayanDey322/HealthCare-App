import { Router } from 'express';
import * as healthController from '../controllers/healthController';

const router = Router();

router.post('/', healthController.addHealthRecord);
router.get('/:childId', healthController.getHealthRecords);
router.get('/:childId/stats', healthController.getHealthRecordStats);
router.delete('/:recordId', healthController.deleteHealthRecord);

export default router;
