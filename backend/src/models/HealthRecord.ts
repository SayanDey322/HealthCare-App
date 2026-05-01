import mongoose, { Schema, Document } from 'mongoose';
import { IHealthRecord } from '../types';

interface IHealthRecordDocument extends IHealthRecord, Document {}

const healthRecordSchema = new Schema<IHealthRecordDocument>(
  {
    childId: {
      type: Schema.Types.ObjectId,
      ref: 'Child',
      required: true,
    },
    recordType: {
      type: String,
      enum: ['temperature', 'heartRate', 'sleep', 'activity', 'weight', 'height'],
      required: true,
    },
    value: {
      type: Number,
      required: true,
    },
    unit: {
      type: String,
      required: true,
    },
    notes: String,
    recordedAt: {
      type: Date,
      default: () => new Date(),
    },
  },
  { timestamps: true }
);

export default mongoose.model<IHealthRecordDocument>('HealthRecord', healthRecordSchema);
