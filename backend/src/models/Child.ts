import mongoose, { Schema, Document } from 'mongoose';
import { IChild } from '../types';

interface IChildDocument extends IChild, Document {}

const childSchema = new Schema<IChildDocument>(
  {
    name: {
      type: String,
      required: [true, 'Child name is required'],
      trim: true,
    },
    dateOfBirth: {
      type: Date,
      required: [true, 'Date of birth is required'],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
      required: true,
    },
    parentId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    bloodType: String,
    allergies: [String],
    medications: [String],
  },
  { timestamps: true }
);

export default mongoose.model<IChildDocument>('Child', childSchema);
