import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { IHealthRecord, IChild } from '../types';
import { healthAPI, childrenAPI } from '../services/api';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export const HealthTrackingPage: React.FC = () => {
  const { childId } = useParams<{ childId: string }>();
  const [child, setChild] = useState<IChild | null>(null);
  const [records, setRecords] = useState<IHealthRecord[]>([]);
  const [recordType, setRecordType] = useState<string>('temperature');
  const [newRecord, setNewRecord] = useState({ value: '', unit: '', notes: '' });
  const [isLoading, setIsLoading] = useState(true);

  const recordTypes = [
    { key: 'temperature', label: 'Temperature', icon: '🌡️', unit: '°C' },
    { key: 'heartRate', label: 'Heart Rate', icon: '💓', unit: 'bpm' },
    { key: 'weight', label: 'Weight', icon: '⚖️', unit: 'kg' },
    { key: 'height', label: 'Height', icon: '📏', unit: 'cm' },
    { key: 'sleep', label: 'Sleep', icon: '😴', unit: 'hours' },
    { key: 'activity', label: 'Activity', icon: '🏃', unit: 'minutes' },
  ];

  useEffect(() => {
    if (childId) {
      loadChild();
      loadRecords();
    }
  }, [childId, recordType]);

  const loadChild = async () => {
    try {
      const response = await childrenAPI.getById(childId!);
      setChild(response.data);
    } catch (error) {
      console.error('Failed to load child:', error);
    }
  };

  const loadRecords = async () => {
    try {
      const response = await healthAPI.getRecords(childId!, recordType);
      setRecords(response.data);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await healthAPI.addRecord({
        childId,
        recordType,
        value: parseFloat(newRecord.value),
        unit: newRecord.unit || recordTypes.find((t) => t.key === recordType)?.unit,
        notes: newRecord.notes,
      });
      setNewRecord({ value: '', unit: '', notes: '' });
      loadRecords();
    } catch (error) {
      console.error('Failed to add record:', error);
    }
  };

  const chartData = records
    .slice()
    .reverse()
    .slice(0, 7)
    .map((record) => ({
      date: new Date(record.recordedAt).toLocaleDateString(),
      value: record.value,
    }));

  const currentType = recordTypes.find((t) => t.key === recordType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-kidhealth-dark mb-8">
          {child?.name ? `${child.name}'s Health` : 'Health Tracking'} {currentType?.icon}
        </h1>

        {/* Record Type Selector */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
          {recordTypes.map((type) => (
            <button
              key={type.key}
              onClick={() => setRecordType(type.key)}
              className={`p-4 rounded-xl transition transform hover:scale-105 ${
                recordType === type.key
                  ? 'bg-gradient-to-br from-kidhealth-primary to-kidhealth-secondary text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:shadow-md'
              }`}
            >
              <div className="text-2xl mb-2">{type.icon}</div>
              <p className="text-sm font-semibold">{type.label}</p>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Record Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-kidhealth-dark mb-4">Add Record</h2>

              <form onSubmit={handleAddRecord} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">
                    {currentType?.label}
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={newRecord.value}
                    onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kidhealth-primary"
                    placeholder="Enter value"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Unit</label>
                  <input
                    type="text"
                    value={newRecord.unit || currentType?.unit}
                    readOnly
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Notes (Optional)</label>
                  <textarea
                    value={newRecord.notes}
                    onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kidhealth-primary"
                    rows={3}
                    placeholder="Add any notes..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-kidhealth-primary to-kidhealth-secondary text-white font-bold py-3 rounded-xl hover:shadow-lg transition"
                >
                  Save Record
                </button>
              </form>
            </div>
          </div>

          {/* Chart and Records */}
          <div className="lg:col-span-2 space-y-6">
            {chartData.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-kidhealth-dark mb-4">Recent Trend</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#6366f1"
                      dot={{ fill: '#ec4899' }}
                      name={currentType?.label}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Recent Records */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-kidhealth-dark mb-4">Recent Records</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {records.slice(0, 10).map((record) => (
                  <div key={record._id} className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-700">
                        {record.value} {record.unit}
                      </p>
                      <p className="text-sm text-gray-500">
                        {new Date(record.recordedAt).toLocaleString()}
                      </p>
                      {record.notes && <p className="text-sm text-gray-600">{record.notes}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
