export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: 'parent' | 'guardian';
  children: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IChild {
  _id?: string;
  name: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  parentId: string;
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IHealthRecord {
  _id?: string;
  childId: string;
  recordType: 'temperature' | 'heartRate' | 'sleep' | 'activity' | 'weight' | 'height';
  value: number;
  unit: string;
  notes?: string;
  recordedAt: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAppointment {
  _id?: string;
  childId: string;
  doctorName: string;
  reason: string;
  appointmentDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IMedication {
  _id?: string;
  childId: string;
  name: string;
  dosage: string;
  frequency: string;
  startDate: Date;
  endDate?: Date;
  prescribedBy?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  token: string;
  user: Partial<IUser>;
}
