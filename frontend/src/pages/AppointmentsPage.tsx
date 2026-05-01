import React, { useState, useEffect } from 'react';
import { IAppointment, IChild } from '../types';
import { appointmentAPI, childrenAPI } from '../services/api';
import { format } from 'date-fns';

interface AppointmentsPageProps {
  childId?: string;
}

export const AppointmentsPage: React.FC<AppointmentsPageProps> = ({ childId: initialChildId }) => {
  const [children, setChildren] = useState<IChild[]>([]);
  const [selectedChildId, setSelectedChildId] = useState(initialChildId || '');
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [formData, setFormData] = useState({
    doctorName: '',
    reason: '',
    appointmentDate: '',
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadChildren();
  }, []);

  useEffect(() => {
    if (selectedChildId) {
      loadAppointments();
    }
  }, [selectedChildId]);

  const loadChildren = async () => {
    try {
      const response = await childrenAPI.getAll();
      setChildren(response.data);
      if (response.data.length > 0 && !selectedChildId) {
        setSelectedChildId(response.data[0]._id);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const loadAppointments = async () => {
    try {
      const response = await appointmentAPI.getAll(selectedChildId);
      setAppointments(response.data.sort((a: IAppointment, b: IAppointment) =>
        new Date(a.appointmentDate).getTime() - new Date(b.appointmentDate).getTime()
      ));
    } catch (error) {
      console.error('Failed to load appointments:', error);
    }
  };

  const handleAddAppointment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await appointmentAPI.create({
        childId: selectedChildId,
        ...formData,
      });
      setFormData({ doctorName: '', reason: '', appointmentDate: '' });
      loadAppointments();
    } catch (error) {
      console.error('Failed to add appointment:', error);
    }
  };

  const handleStatusChange = async (appointmentId: string, status: string) => {
    try {
      await appointmentAPI.update(appointmentId, { status });
      loadAppointments();
    } catch (error) {
      console.error('Failed to update appointment:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const upcomingAppointments = appointments.filter(
    (apt) => new Date(apt.appointmentDate) > new Date() && apt.status !== 'cancelled'
  );

  const pastAppointments = appointments.filter(
    (apt) => new Date(apt.appointmentDate) <= new Date() || apt.status === 'completed'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-kidhealth-dark mb-8">📅 Doctor Appointments</h1>

        {/* Child Selector */}
        <div className="mb-8">
          <label className="block text-gray-700 font-semibold mb-3">Select Child</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {children.map((child) => (
              <button
                key={child._id}
                onClick={() => setSelectedChildId(child._id)}
                className={`p-3 rounded-xl font-semibold transition ${
                  selectedChildId === child._id
                    ? 'bg-gradient-to-r from-kidhealth-primary to-kidhealth-secondary text-white'
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-kidhealth-primary'
                }`}
              >
                {child.name}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Add Appointment Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-2xl font-bold text-kidhealth-dark mb-4">Schedule Appointment</h2>

              <form onSubmit={handleAddAppointment} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Doctor Name</label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kidhealth-primary"
                    placeholder="Dr. Jane Smith"
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Reason</label>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kidhealth-primary"
                    rows={3}
                    placeholder="Reason for visit..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Date & Time</label>
                  <input
                    type="datetime-local"
                    value={formData.appointmentDate}
                    onChange={(e) => setFormData({ ...formData, appointmentDate: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-kidhealth-primary"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-kidhealth-primary to-kidhealth-secondary text-white font-bold py-3 rounded-xl hover:shadow-lg transition"
                >
                  Schedule
                </button>
              </form>
            </div>
          </div>

          {/* Appointments List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Upcoming Appointments */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-kidhealth-dark mb-4">Upcoming</h3>
              {upcomingAppointments.length > 0 ? (
                <div className="space-y-3">
                  {upcomingAppointments.map((apt) => (
                    <div key={apt._id} className="p-4 bg-blue-50 border-l-4 border-blue-500 rounded-xl">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">Dr. {apt.doctorName}</h4>
                          <p className="text-gray-600">{apt.reason}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 font-semibold">
                        📅 {format(new Date(apt.appointmentDate), 'MMM dd, yyyy - h:mm a')}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No upcoming appointments</p>
              )}
            </div>

            {/* Past Appointments */}
            {pastAppointments.length > 0 && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-2xl font-bold text-kidhealth-dark mb-4">Past Appointments</h3>
                <div className="space-y-3">
                  {pastAppointments.slice(0, 5).map((apt) => (
                    <div key={apt._id} className="p-4 bg-gray-50 border-l-4 border-gray-300 rounded-xl opacity-75">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-lg text-gray-800">Dr. {apt.doctorName}</h4>
                          <p className="text-gray-600">{apt.reason}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(apt.status)}`}>
                          {apt.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        📅 {format(new Date(apt.appointmentDate), 'MMM dd, yyyy - h:mm a')}
                      </p>
                      {apt.notes && <p className="text-sm text-gray-600 mt-2">Notes: {apt.notes}</p>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
