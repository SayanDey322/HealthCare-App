import mongoose, { Schema, Document } from 'mongoose';
import { IAppointment } from '../types';

interface IAppointmentDocument extends IAppointment, Document {}

const appointmentSchema = new Schema<IAppointmentDocument>(
  {
    childId: {
      type: Schema.Types.ObjectId,
      ref: 'Child',
      required: true,
    },
    doctorName: {
      type: String,
      required: true,
    },
    reason: {
      type: String,
      required: true,
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled',
    },
    notes: String,
  },
  { timestamps: true }
);

export default mongoose.model<IAppointmentDocument>('Appointment', appointmentSchema);
