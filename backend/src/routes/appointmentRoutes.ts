import { Router } from 'express';
import * as appointmentController from '../controllers/appointmentController';

const router = Router();

router.post('/', appointmentController.createAppointment);
router.get('/:childId', appointmentController.getAppointments);
router.put('/:appointmentId', appointmentController.updateAppointment);
router.delete('/:appointmentId', appointmentController.deleteAppointment);

export default router;
