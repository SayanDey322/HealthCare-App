import React, { useState } from 'react';   
import { useNavigate } from 'react-router-dom';  
import { useAuth } from '../context/AuthContext';

interface AddChildModalProps {
  isOpen: boolean; 
  onClose: () => void;
  onSubmit: (data: any) => Promise<void>;
}

export const AddChildModal: React.FC<AddChildModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    gender: 'male',
    bloodType: '',
    allergies: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await onSubmit({
        ...formData,
        allergies: formData.allergies ? formData.allergies.split(',').map((a) => a.trim()) : [],
      });
      setFormData({ name: '', dateOfBirth: '', gender: 'male', bloodType: '', allergies: '' });
      onClose();
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-kidhealth-dark mb-6">Add Child Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2">Child's Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kidhealth-primary transition"
              placeholder="Enter child's name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kidhealth-primary transition"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kidhealth-primary transition"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Blood Type (Optional)</label>
            <input
              type="text"
              name="bloodType"
              value={formData.bloodType}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kidhealth-primary transition"
              placeholder="e.g., O+"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-2">Allergies (Optional)</label>
            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kidhealth-primary transition"
              placeholder="Comma separated (e.g., Peanuts, Dairy)"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 bg-gradient-to-r from-kidhealth-primary to-kidhealth-secondary text-white font-semibold py-3 rounded-xl hover:shadow-lg transition disabled:opacity-50"
            >
              {isLoading ? 'Adding...' : 'Add Child'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
