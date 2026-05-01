import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from './types';

interface IUserDocument extends IUser, Document {}

const userSchema = new Schema<IUserDocument>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['parent', 'guardian'],
      default: 'parent',
    },
    children: [{
      type: Schema.Types.ObjectId,
      ref: 'Child',
    }],
  },
  { timestamps: true }
);

export default mongoose.model<IUserDocument>('User', userSchema);
