import mongoose, { Schema, Document } from 'mongoose';
import { IMedication } from '../types';

interface IMedicationDocument extends IMedication, Document {}

const medicationSchema = new Schema<IMedicationDocument>(
  {
    childId: {
      type: Schema.Types.ObjectId,
      ref: 'Child',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dosage: {
      type: String,
      required: true,
    },
    frequency: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: Date,
    prescribedBy: String,
  },
  { timestamps: true }
);

export default mongoose.model<IMedicationDocument>('Medication', medicationSchema);
