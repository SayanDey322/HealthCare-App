import React from 'react';
import { IChild } from '../types';

interface ChildCardProps {
  child: IChild;
  onSelect: () => void;
}

export const ChildCard: React.FC<ChildCardProps> = ({ child, onSelect }) => {
  const getAge = (dateOfBirth: Date) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);

    let age = today.getFullYear() - birthDate.getFullYear();
    const month = today.getMonth() - birthDate.getMonth();

    if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const getGenderEmoji = (gender: string) => {
    return gender === 'male' ? '👦' : gender === 'female' ? '👧' : '🧒';
  };

  return (
    <div onClick={onSelect} className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover:shadow-xl hover:scale-105 transition transform" >    
      <div className="text-5xl mb-3">{getGenderEmoji(child.gender)}</div>

      <h3 className="text-2xl font-bold text-kidhealth-dark mb-2">
        {child.name}
      </h3>

      <p className="text-gray-600 mb-2">
        Age: {getAge(new Date(child.dateOfBirth))} years
      </p>

      {child.bloodType && (
        <p className="text-sm bg-red-100 text-red-800 px-3 py-1 rounded-full inline-block">
          Blood Type: {child.bloodType}
        </p>
      )}
    </div>
  );
};