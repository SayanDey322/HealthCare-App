import { Response } from 'express';
import Appointment from '../models/Appointment';
import Child from '../models/Child';
import { AuthRequest } from '../middleware/auth';

export const createAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId, doctorName, reason, appointmentDate } = req.body;

    // Verify ownership
    const child = await Child.findOne({ _id: childId, parentId: req.userId });
    if (!child) {
      res.status(404).json({ error: 'Child not found' });
      return;
    }

    const appointment = new Appointment({
      childId,
      doctorName,
      reason,
      appointmentDate,
    });

    await appointment.save();
    res.status(201).json(appointment);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create appointment' });
  }
};

export const getAppointments = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { childId } = req.params;

    // Verify ownership
    const child = await Child.findOne({ _id: childId, parentId: req.userId });
    if (!child) {
      res.status(404).json({ error: 'Child not found' });
      return;
    }

    const appointments = await Appointment.find({ childId }).sort({ appointmentDate: 1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch appointments' });
  }
};

export const updateAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    // Verify ownership
    const child = await Child.findOne({ _id: appointment.childId, parentId: req.userId });
    if (!child) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    const updated = await Appointment.findByIdAndUpdate(appointmentId, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update appointment' });
  }
};

export const deleteAppointment = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { appointmentId } = req.params;

    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      res.status(404).json({ error: 'Appointment not found' });
      return;
    }

    // Verify ownership
    const child = await Child.findOne({ _id: appointment.childId, parentId: req.userId });
    if (!child) {
      res.status(403).json({ error: 'Unauthorized' });
      return;
    }

    await Appointment.findByIdAndDelete(appointmentId);
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete appointment' });
  }
};
