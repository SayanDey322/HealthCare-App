

export const calculateAge = (dateOfBirth: Date): number => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const month = today.getMonth() - birthDate.getMonth();
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const formatDate = (date: Date): string => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateTime = (date: Date): string => {
  return new Date(date).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const getHealthStatus = (value: number, type: string): string => {
  switch (type) {
    case 'temperature':
      if (value < 36.5) return 'Low';
      if (value > 37.5) return 'High';
      return 'Normal';
    case 'heartRate':
      if (value < 60) return 'Low';
      if (value > 100) return 'High';
      return 'Normal';
    default:
      return 'Normal';
  }
};

export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const getRecordTypeEmoji = (type: string): string => {
  const emojis: Record<string, string> = {
    temperature: '🌡️',
    heartRate: '💓',
    weight: '⚖️',
    height: '📏',
    sleep: '😴',
    activity: '🏃',
  };
  return emojis[type] || '📊';
};
