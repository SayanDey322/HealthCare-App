export interface IUser {
  _id: string;
  name: string;
  email: string;
  role: 'parent' | 'guardian';
  children: IChild[];
}

export interface IChild {
  _id: string;
  name: string;
  dateOfBirth: Date;
  gender: 'male' | 'female' | 'other';
  bloodType?: string;
  allergies?: string[];
  medications?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IHealthRecord {
  _id: string;
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
  _id: string;
  childId: string;
  doctorName: string;
  reason: string;
  appointmentDate: Date;
  status: 'scheduled' | 'completed' | 'cancelled';
  notes?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}
