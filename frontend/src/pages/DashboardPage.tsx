import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { childrenAPI, healthAPI } from '../services/api';
import { IChild, IHealthRecord } from '../types';
import { ChildCard } from '../components/ChildCard';
import { AddChildModal } from '../components/AddChildModal';

export const DashboardPage: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [children, setChildren] = useState<IChild[]>([]);
  const [selectedChild, setSelectedChild] = useState<IChild | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [recentRecords, setRecentRecords] = useState<IHealthRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChildren();
  }, []);

  useEffect(() => {
    if (selectedChild) {
      loadRecentRecords();
    }
  }, [selectedChild]);

  const loadChildren = async () => {
    try {
      const response = await childrenAPI.getAll();
      setChildren(response.data);
      if (response.data.length > 0) {
        setSelectedChild(response.data[0]);
      }
    } catch (error) {
      console.error('Failed to load children:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadRecentRecords = async () => {
    try {
      const response = await healthAPI.getRecords(selectedChild!._id);
      setRecentRecords(response.data.slice(0, 5));
    } catch (error) {
      console.error('Failed to load records:', error);
    }
  };

  const handleAddChild = async (data: any) => {
    try {
      await childrenAPI.create(data);
      loadChildren();
    } catch (error) {
      console.error('Failed to add child:', error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-kidhealth-light via-white to-pink-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-kidhealth-primary via-kidhealth-secondary to-kidhealth-accent shadow-lg">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="text-4xl">💚</div>
            <div>
              <h1 className="text-3xl font-bold text-white">KidHealth</h1>
              <p className="text-white text-opacity-90">Your child's health, our priority</p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-white">
              <p className="font-semibold">Welcome, {user?.name}!</p>
              <p className="text-sm text-white text-opacity-80">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-bold rounded-lg transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <button
            onClick={() => navigate('/appointments')}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-center"
          >
            <div className="text-4xl mb-3">📅</div>
            <h3 className="font-bold text-lg text-kidhealth-dark">Appointments</h3>
            <p className="text-sm text-gray-600">Manage doctor visits</p>
          </button>

          <button
            onClick={() => selectedChild && navigate(`/health/${selectedChild._id}`)}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-center"
          >
            <div className="text-4xl mb-3">📊</div>
            <h3 className="font-bold text-lg text-kidhealth-dark">Health Records</h3>
            <p className="text-sm text-gray-600">Track vitals</p>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-center"
          >
            <div className="text-4xl mb-3">➕</div>
            <h3 className="font-bold text-lg text-kidhealth-dark">Add Child</h3>
            <p className="text-sm text-gray-600">Create new profile</p>
          </button>

          <button
            className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition transform hover:scale-105 text-center"
          >
            <div className="text-4xl mb-3">📋</div>
            <h3 className="font-bold text-lg text-kidhealth-dark">Documents</h3>
            <p className="text-sm text-gray-600">Medical records</p>
          </button>
        </div>

        {/* Children Profiles */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-kidhealth-dark mb-6">Children Profiles</h2>
          {children.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {children.map((child) => (
                <ChildCard
                  key={child._id}
                  child={child}
                  onSelect={() => {
                    setSelectedChild(child);
                    navigate(`/health/${child._id}`);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-4">👶</div>
              <p className="text-gray-600 text-lg mb-6">No children profiles yet</p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-8 py-3 bg-gradient-to-r from-kidhealth-primary to-kidhealth-secondary text-white font-bold rounded-lg hover:shadow-lg transition"
              >
                Create First Profile
              </button>
            </div>
          )}
        </div>

        {/* Recent Health Records */}
        {selectedChild && (
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-kidhealth-dark">
                Recent Records - {selectedChild.name}
              </h2>
              <button
                onClick={() => navigate(`/health/${selectedChild._id}`)}
                className="text-kidhealth-secondary font-bold hover:underline"
              >
                View All →
              </button>
            </div>

            {recentRecords.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {recentRecords.map((record) => {
                  const typeIcons: Record<string, string> = {
                    temperature: '🌡️',
                    heartRate: '💓',
                    weight: '⚖️',
                    height: '📏',
                    sleep: '😴',
                    activity: '🏃',
                  };

                  return (
                    <div key={record._id} className="bg-gradient-to-br from-kidhealth-light to-pink-50 rounded-xl p-4">
                      <div className="text-3xl mb-2">{typeIcons[record.recordType]}</div>
                      <p className="text-sm text-gray-600 font-semibold">{record.recordType}</p>
                      <p className="text-2xl font-bold text-kidhealth-dark">
                        {record.value} {record.unit}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {new Date(record.recordedAt).toLocaleDateString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No health records yet</p>
            )}
          </div>
        )}
      </main>

      {/* Add Child Modal */}
      <AddChildModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddChild}
      />
    </div>
  );
};
